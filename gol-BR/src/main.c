#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "screen.h"
#include "keyboard.h"
#include "timer.h"

#define PONTOS_MAXIMOS 5
#define DURACAO_SEGUNDOS 120
#define MAX_JOGADORES 100
#define ARQUIVO_RANKING "data/ranking.txt"
#define RANKING_ORDENADO "data/ranking_ordenado.txt"

#define ALTURA_RAQUETE 6
#define CARACTERE_RAQUETE '|'
#define CARACTERE_BOLA    'O'

typedef struct {
    char nome[21];
    int pontos;
    int x, y; // posição da raquete
    int vitorias;
    int derrotas;
} Jogador;

typedef struct {
    int x, y;
    int dir_x, dir_y;
} Bola;

long contagem_ticks = 0;
long ticks_por_segundo;
long max_ticks;

int carregarRanking(const char* file, Jogador ranking[], int* total) {
    FILE* f = fopen(file, "r");
    if (!f) return 0;
    *total = 0;
    while (fscanf(f, "%20s %d %d", ranking[*total].nome, &ranking[*total].vitorias, &ranking[*total].derrotas) == 3) {
        (*total)++;
        if (*total >= MAX_JOGADORES) break;
    }
    fclose(f);
    return 1;
}

void salvarRanking(Jogador ranking[], int total, const char* file) {
    FILE* f = fopen(file, "w");
    if (!f) return;

    for (int i = 0; i < total; i++) {
        fprintf(f, "%s %d %d\n", ranking[i].nome, ranking[i].vitorias, ranking[i].derrotas);
    }
    fclose(f);
}

void atualizarRanking(Jogador ranking[], int* total, char* nome, int venceu) {
    for (int i = 0; i < *total; i++) {
        if (strcmp(ranking[i].nome, nome) == 0) {
            if (venceu)
                ranking[i].vitorias++;
            else
                ranking[i].derrotas++;
            return;
        }
    }

    strcpy(ranking[*total].nome, nome);
    ranking[*total].vitorias = venceu ? 1 : 0;
    ranking[*total].derrotas = venceu ? 0 : 1;
    (*total)++;
}

void exibirRanking(Jogador ranking[], int total) {
    printf("\n==== RANKING GERAL ====\n");
    for (int i = 0; i < total; i++) {
        printf("%-10s - Vitorias: %-2d - Derrotas: %-2d\n",
           ranking[i].nome,
           ranking[i].vitorias,
           ranking[i].derrotas);
    }
    printf("=======================\n");
}

void ordenaRanking(const char* entrada, const char* saida) {
    Jogador ranking[MAX_JOGADORES];
    int total = 0;

    FILE* f_entrada = fopen(entrada, "r");
    if (!f_entrada) {
        printf("Erro ao abrir %s\n", entrada);
        return;
    }

    while (fscanf(f_entrada, "%20s %d %d", ranking[total].nome, &ranking[total].vitorias, &ranking[total].derrotas) == 3) {
        total++;
        if (total >= MAX_JOGADORES) break;
    }
    fclose(f_entrada);

    for (int i = 0; i < total - 1; i++) {
        for (int j = 0; j < total - i - 1; j++) {
            if (ranking[j].vitorias < ranking[j + 1].vitorias) {
                Jogador temp = ranking[j];
                ranking[j] = ranking[j + 1];
                ranking[j + 1] = temp;
            }
        }
    }

    FILE* f_saida = fopen(saida, "w");
    if (!f_saida) {
        printf("Erro ao criar %s\n", saida);
        return;
    }

    for (int i = 0; i < total; i++) {
        fprintf(f_saida, "%s %d %d\n", ranking[i].nome, ranking[i].vitorias, ranking[i].derrotas);
    }

    fclose(f_saida);

}


// retorna quantos caracteres de borda foram desenhados
int desenharBordas() {
    int total = 0;
    screenSetColor(GREEN, DARKGRAY);
    for (int x = MINX; x <= MAXX; x++) {
        screenGotoxy(x, MINY); printf("-"); total++;
        screenGotoxy(x, MAXY); printf("-"); total++;
    }
    for (int y = MINY; y <= MAXY; y++) {
        screenGotoxy(MINX, y); printf("|"); total++;
        screenGotoxy(MAXX, y); printf("|"); total++;
    }
    return total;
}

void desenharRaquete(int x, int y) {
    screenSetColor(YELLOW, DARKGRAY);
    for (int i = 0; i < ALTURA_RAQUETE; i++) {
        screenGotoxy(x, y + i);
        printf("%c", CARACTERE_RAQUETE);
    }
}

void apagarRaquete(int x, int y) {
    for (int i = 0; i < ALTURA_RAQUETE; i++) {
        screenGotoxy(x, y + i);
        printf(" ");
    }
}

void desenharBola(int x, int y) {
    screenSetColor(CYAN, DARKGRAY);
    screenGotoxy(x, y);
    printf("%c", CARACTERE_BOLA);
}

void apagarBola(int x, int y) {
    screenGotoxy(x, y);
    printf(" ");
}

void desenharPlacarETempo(Jogador* j1, Jogador* j2) {
    desenharBordas();

    screenSetColor(CYAN, DARKGRAY);
    screenGotoxy(MINX + 2, MINY);
    printf("%s: %d", j1->nome, j1->pontos);

    int decorrido = contagem_ticks / ticks_por_segundo;
    int restante = DURACAO_SEGUNDOS - decorrido;
    if (restante < 0) restante = 0;
    int minutos = restante / 60, segundos = restante % 60;
    int centro = (MAXX + MINX) / 2 - 2;
    screenGotoxy(centro, MINY);
    printf("%02d:%02d", minutos, segundos);

    int len_nome = strlen(j2->nome) + 4;
    screenGotoxy(MAXX - len_nome, MINY);
    printf("%s: %d", j2->nome, j2->pontos);
}

int main() {
    Jogador* jogador1 = malloc(sizeof(Jogador));
    Jogador* jogador2 = malloc(sizeof(Jogador));
    Bola* bola = malloc(sizeof(Bola));
    Jogador ranking[MAX_JOGADORES];
    int total_jogadores = 0;
    carregarRanking(ARQUIVO_RANKING, ranking, &total_jogadores);

    if (!jogador1 || !jogador2 || !bola) {
        fprintf(stderr, "Erro ao alocar memória.\n");
        return 1;
    }

    printf("Nome do Jogador 1 (W/S): ");
    fgets(jogador1->nome, sizeof(jogador1->nome), stdin);
    jogador1->nome[strcspn(jogador1->nome, "\n")] = '\0';
    jogador1->pontos = 0;

    printf("Nome do Jogador 2 (O/L): ");
    fgets(jogador2->nome, sizeof(jogador2->nome), stdin);
    jogador2->nome[strcspn(jogador2->nome, "\n")] = '\0';
    jogador2->pontos = 0;

    screenInit(1);
    keyboardInit();
    timerInit(75); // 13.33 ticks por segundo

    ticks_por_segundo = 1000 / 75;
    max_ticks = DURACAO_SEGUNDOS * ticks_por_segundo;

    
    char jogar_novamente;
    do {
        jogador1->pontos = jogador2->pontos = 0;
        jogador1->x = 2;
        jogador2->x = MAXX - 3;
        jogador1->y = jogador2->y = MAXY / 2 - ALTURA_RAQUETE / 2;

        bola->x = (MAXX + MINX) / 2;
        bola->y = (MAXY + MINY) / 2;
        bola->dir_x = +1;
        bola->dir_y = +1;

        contagem_ticks = 0;

        screenClear();
        desenharPlacarETempo(jogador1, jogador2);
        desenharRaquete(jogador1->x, jogador1->y);
        desenharRaquete(jogador2->x, jogador2->y);
        desenharBola(bola->x, bola->y);
        screenUpdate();

        while (contagem_ticks < max_ticks && jogador1->pontos < PONTOS_MAXIMOS && jogador2->pontos < PONTOS_MAXIMOS) {
            if (keyhit()) {
                int tecla = readch();
                switch (tecla) {
                    case 'w': case 'W':
                        if (jogador1->y > MINY + 1) {
                            apagarRaquete(jogador1->x, jogador1->y);
                            jogador1->y--;
                            desenharRaquete(jogador1->x, jogador1->y);
                        }
                        break;
                    case 's': case 'S':
                        if (jogador1->y + ALTURA_RAQUETE < MAXY - 1) {
                            apagarRaquete(jogador1->x, jogador1->y);
                            jogador1->y++;
                            desenharRaquete(jogador1->x, jogador1->y);
                        }
                        break;
                    case 'o': case 'O':
                        if (jogador2->y > MINY + 1) {
                            apagarRaquete(jogador2->x, jogador2->y);
                            jogador2->y--;
                            desenharRaquete(jogador2->x, jogador2->y);
                        }
                        break;
                    case 'l': case 'L':
                        if (jogador2->y + ALTURA_RAQUETE < MAXY - 1) {
                            apagarRaquete(jogador2->x, jogador2->y);
                            jogador2->y++;
                            desenharRaquete(jogador2->x, jogador2->y);
                        }
                        break;
                }
                screenUpdate();
            }

            if (timerTimeOver()) {
                apagarBola(bola->x, bola->y);

                int prox_x = bola->x + bola->dir_x;
                int prox_y = bola->y + bola->dir_y;

                if (prox_y <= MINY + 1 || prox_y >= MAXY - 1) {
                    bola->dir_y = -bola->dir_y;
                    prox_y = bola->y + bola->dir_y;
                }

                if (prox_x == jogador1->x + 1 && prox_y >= jogador1->y && prox_y < jogador1->y + ALTURA_RAQUETE) {
                    bola->dir_x = +1; prox_x = bola->x + bola->dir_x;
                }
                else if (prox_x == jogador2->x - 1 && prox_y >= jogador2->y && prox_y < jogador2->y + ALTURA_RAQUETE) {
                    bola->dir_x = -1; prox_x = bola->x + bola->dir_x;
                }
                else if (prox_x >= MAXX) {
                    jogador1->pontos++;
                    prox_x = (MAXX + MINX) / 2;
                    prox_y = (MAXY + MINY) / 2;
                    bola->dir_x = -1;
                }
                else if (prox_x <= MINX) {
                    jogador2->pontos++;
                    prox_x = (MAXX + MINX) / 2;
                    prox_y = (MAXY + MINY) / 2;
                    bola->dir_x = +1;
                }

                bola->x = prox_x;
                bola->y = prox_y;
                desenharPlacarETempo(jogador1, jogador2);
                desenharBola(bola->x, bola->y);
                screenUpdate();

                contagem_ticks++;
            }
        }

        screenSetColor(WHITE, DARKGRAY);
        screenGotoxy((MAXX + MINX) / 2 - 6, (MAXY + MINY) / 2);
        if (jogador1->pontos > jogador2->pontos){
            printf("%s VENCEU!", jogador1->nome);
            atualizarRanking(ranking, &total_jogadores, jogador1->nome, 1);
            atualizarRanking(ranking, &total_jogadores, jogador2->nome, 0);
        }
        else if (jogador2->pontos > jogador1->pontos){
            printf("%s VENCEU!", jogador2->nome);
            atualizarRanking(ranking, &total_jogadores, jogador2->nome, 1);
            atualizarRanking(ranking, &total_jogadores, jogador1->nome, 0);
        }
        else {
            printf("EMPATE!");
            atualizarRanking(ranking, &total_jogadores, jogador1->nome, 0);
            atualizarRanking(ranking, &total_jogadores, jogador2->nome, 0);
        }
        
        Jogador ranking_ordenado[MAX_JOGADORES];
        salvarRanking(ranking, total_jogadores, ARQUIVO_RANKING);
        ordenaRanking(ARQUIVO_RANKING, RANKING_ORDENADO);

        screenUpdate();

        char op;
        do {
            screenSetColor(WHITE, DARKGRAY);
            screenGotoxy((MAXX + MINX) / 2 - 25, ((MAXY + MINY) / 2)+2);
            printf("Escolha: (j) Jogar novamente - (r) Ver ranking - (s) Sair");
            screenUpdate();
            op = readch();

            if (op == 'r' || op == 'R'){
                int total_ordenado = 0;
                carregarRanking(RANKING_ORDENADO, ranking_ordenado, &total_ordenado);

                screenClear();
                screenUpdate();
                exibirRanking(ranking_ordenado, total_ordenado);
                printf("\nPressione qualquer tecla para voltar ao menu...\n");
                readch(); // aguarda entrada antes de voltar ao menu
                screenClear();
                screenUpdate();
            }

        } while (op != 'j' && op != 'J' &&
                 op != 's' && op != 'S');
        jogar_novamente = (op == 'j' || op == 'J') ? 's' : 'n';


    } while (jogar_novamente == 's' || jogar_novamente == 'S');

    free(jogador1);
    free(jogador2);
    free(bola);
    keyboardDestroy();
    screenDestroy();
    timerDestroy();
    return 0;
}
