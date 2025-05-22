#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "screen.h"
#include "keyboard.h"
#include "timer.h"

#define PONTOS_MAXIMOS 5
#define DURACAO_SEGUNDOS 120

#define ALTURA_RAQUETE 6
#define CARACTERE_RAQUETE '|'
#define CARACTERE_BOLA    'O'

typedef struct {
    char nome[21];
    int pontos;
    int x, y; // posição da raquete
} Jogador;

typedef struct {
    int x, y;
    int dir_x, dir_y;
} Bola;

long contagem_ticks = 0;
long ticks_por_segundo;
long max_ticks;

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
    timerInit(75); // 20 ticks por segundo

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
        if (jogador1->pontos > jogador2->pontos)
            printf("%s VENCEU!", jogador1->nome);
        else if (jogador2->pontos > jogador1->pontos)
            printf("%s VENCEU!", jogador2->nome);
        else
            printf("EMPATE!");
        screenUpdate();

        screenGotoxy((MAXX + MINX) / 2 - 10, (MAXY + MINY) / 2 + 2);
        printf("Jogar novamente? (s/n): ");
        screenUpdate();
        do {
            jogar_novamente = readch();
        } while (jogar_novamente != 's' && jogar_novamente != 'S' &&
                 jogar_novamente != 'n' && jogar_novamente != 'N');

    } while (jogar_novamente == 's' || jogar_novamente == 'S');

    free(jogador1);
    free(jogador2);
    free(bola);
    keyboardDestroy();
    screenDestroy();
    timerDestroy();
    return 0;
}
