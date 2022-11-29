/*
Totale scambiato = 50
Pedane ricevute indietro = 30
Pedane da stornare = 20
Pedane scaricate = [5, 4, 1, 20, 14, 2, 4]

------------------------------------------------------------------------

Metodo breve con formula
storno totale = pedane scaricate - pedane caricate

Formula storno cliente: 
(Pedane scaricate per mittente / totale pedane scaricate) * storno

Cliente 1 = (5 / 50) * 20 = 2 pedane
Cliente 2 = (4 / 50) * 20 = 1,6 pedane
Cliente 3 = (1 / 50) * 20 = 0,4 pedane
Cliente 4 = (20 / 50) * 20 = 8 pedane
Cliente 5 = (14 / 50) * 20 = 5,6 pedane
Cliente 6 = (2 / 50) * 20 = 0,8 pedane
Cliente 7 = (4 / 50) * 20 = 1,6 pedane

------------------------------------------------------------------------

Metodo lungo con percentuali (la prova)

5:50 = x:100 = 10% => (5 / 50) * 100
4:50 = x:100 = 8% => (4 / 50) * 100
1:50 = x:100 = 2% => (1 / 50) * 100
20:50 = x:100 = 40% => (20 / 50) * 100
14:50 = x:100 = 28% => (14 / 50) * 100
2:50 = x:100 = 4% => (2 / 50) * 100
4:50 = x:100 = 8% => (4 / 50) * 100

Cliente 1 = 2 pedane (20*10)/100
Cliente 2 = 1,6 pedane (20*8)/100
Cliente 3 = 0,4 pedane (20*2)/100
Cliente 4 = 8 pedane (20*40)/100
Cliente 5 = 5,6 pedane (20*28)/100
Cliente 6 = 0,8 pedane (20*4)/100
Cliente 7 = 1,6 pedane (20*8)/100
*/
