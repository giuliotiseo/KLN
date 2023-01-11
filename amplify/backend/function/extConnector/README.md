# KLN External Connector

## Descrizione

Questa repository contiene il codice che garantisce la comunicazione tra la base dati della piattaforma web di *KLN - Key Logistic Transport* ed il gestionale desktop per la fatturazione e il calcolo dei costi aziendali.

## Quick Start

La connessione è stabilità attraverso una chiamata (POST) da effettuare al seguente endpoint:

`https://olaq9v5vdc.execute-api.eu-central-1.amazonaws.com/master/connect`

La API consente di interrogare alcune informazioni dalla piattaforma:

- Ordini (type: **Order**)
  
- Viaggi (type: **Travel**)
  
- Veicoli (type: **Vehicle**)
  
- Clienti (type: **Customer**)
  

Per ottenere tali dati dal portale sarà sufficiente specificare nel body della richiesta i seguenti parametri:

- *id*
- *type*
- *start* (valido solo per Order e Travel)
- *end* (valido solo per Order e Travel)
- *sortDirection* (opz.)
- *nextToken* (opz.)
- *limit* (opz.)
  
Esempio:
```json
{
    "id": "[ID_AZIENDALE]",
    "type": "Order",
    "start": "YYYY-MM-DDThh:mm:ss+/-hh:mm",
    "end": "YYYY-MM-DDThh:mm:ss+/-hh:mm",
    "limit": "999" 
}
```

### Order: Esempio di chiamata area ordini

```json
{
    "id": "50f0913f8030a048e47cc1b7842aca2977d15f77964a5cd2cf98f7e40dfa3fb5",
    "type": "Order",
    "start": "2022-07-01T00:00:00+02:00",
    "end": "2022-12-31T00:00:00+02:00",
    "limit": "20"
}
```

### Travel: Esempio di chiamata area viaggi

```json
{
    "id": "50f0913f8030a048e47cc1b7842aca2977d15f77964a5cd2cf98f7e40dfa3fb5",
    "type": "Travel",
    "start": "2022-07-01T00:00:00+02:00",
    "end": "2022-12-31T00:00:00+02:00",
    "limit": "100"
}
```

### Vehicle: Esempio di chiamata area veicoli

```json
{
    "id": "50f0913f8030a048e47cc1b7842aca2977d15f77964a5cd2cf98f7e40dfa3fb5",
    "type": "Vehicle",
    "limit": "100"
}
```

### Customer: Esempio di chiamata area clienti

```json
{
    "id": "50f0913f8030a048e47cc1b7842aca2977d15f77964a5cd2cf98f7e40dfa3fb5",
    "type": "Customer",
    "limit": "999"
}
```

## Paginazione

Nel caso in cui il risultato della chiamata dovesse ritornare, oltre all'elenco di dati, una stringa all'interno dell'attributo ***nextToken***, vorrà dire che l'elenco ottenuto è incompleto. È possibile ottenere i dati mancanti attraverso una nuova chiamata che dovrà includere il *nextToken* all'interno del body.

```json
{
    "id": "50f0913f8030a048e47cc1b7842aca2977d15f77964a5cd2cf98f7e40dfa3fb5",
    "type": "Customer",
    "limit": "999"
    "nextToken": "saknjd789sahd098sa7dh807ashd9saydh9ysahdasy8udha..."
}
```

### Attributi di Order

| Attributo | Descrizione |
| --- | --- |
| id  | ID univoco ordine |
| extId | ID utilizzato nelle comunicazioni esterne |
| stamp | Codice ordine interno leggibile |
| name | Nome ordine |
| preOrderId | ID pre-ordine |
| carrierId | ID azienda trasporto |
| receiverId | ID azienda destinataria |
| senderId | ID azienda committente |
| pickupStorageId | ID azienda mittente |
| deliveryStorageId | ID azienda di destinazione |
| carrierName | Ragione sociale azienda trasporto |
| senderName | Ragione sociale azienda committente |
| receiverName | Ragione sociale azienda destinataria |
| pickupStorageName | Ragione sociale azienda mittente |
| deliveryStorageName | Ragione sociale azienda di destinazione |
| carrierVat | Partita IVA azienda trasporto |
| senderVat | Partita IVA azienda committente |
| receiverVat | Partita IVA azienda destinataria |
| pickupStorageVat | Partita IVA azienda mittente |
| deliveryStorageVat | Partita IVA azienda di destinazione |
| completedAt | Data di consegna dell'ordine |
| paymentCondition | Metodo di pagamento (p. franco, assegnato) |
| shipmentType | Tipo di consegna (diretto, groupage) |
| billingType | Tipologia fatturazione (diretto, groupage, spola + groupage, diretto con scarico intermedio) |
| pickupCheckpoint | Info punto di ritiro |
| pickupDateStart | Info orario di ritiro (da: ...) |
| pickupDateEnd | Info orario di ritiro (a: ...) |
| depotCheckpoint | Info punto di deposito |
| depotDateStart | Info orario di deposito (da: ...) |
| depotDateEnd | Info orario di deposito (a: ...) |
| deliveryCheckpoint | Info punto di consegna |
| deliveryDateStart | Info orario di consegna (da: ...) |
| deliveryDateEnd | Info orario di consegna (a: ...) |
| status | Stato ordine |
| orderNumber | Numero ordine (identificazione interna per magazzinieri) |
| docs | Documenti allegati |
| support | Basi a terra: supporto di spedizione della merce ai fini della fatturazione e dello spazio occupato |
| quantity | Quantità di basi a terra ai fini della fatturazione e dello spazio occupato |
| size | Grandezza della singola base |
| loadingMeter | Metri lineari delle basi a terra |
| grossWeight | Peso lordo |
| netWeight | Peso netto |
| packages | Numero di scatole |
| customer | Info dell'azienda a cui fatturare |
| palletInfo | Informazioni interscambio pallet |
| collectChecks | Richiesta di ritiro assegno (true/false) |
| checks | Elenco assegni associati all'ordine (type: **Check**) |
| travels | Elenco viaggi percorsi dall'ordine (type: **Travel**) |

### Attributi di Travel

| Attributo | Descrizione |
| --- | --- |
| id  | ID univoco viaggio |
| stamp | Codice viaggio interno leggibile |
| carrierId | ID azienda trasporto |
| tenant | ID account aziendale |
| status | Stato viaggio |
| createdAt | Data di creazione viaggio |
| departureDate | Data di partenza |
| updatedAt | Data dell'ultimo aggiornamento sul viaggio |
| licensePlate | Targa veicolo/i |
| vehicleName | Nome veicolo/i interessati nel viaggio |
| driverFiscalCode | Codice fiscale autista |
| driver | Info riassuntive dell'autista |
| estimatedTravelTime | Stima tempi di viaggio |
| estimatedTravelLength | Stima lunghezza (km) del viaggio |
| estimatedTransportCosts | Stima costi di viaggio |
| start | Info punto di partenza |
| waypoints | Elenco delle fermate |
| end | Info punto di rientro |
| plannedOrderIds | ID pianificazione ordine |
| travelType | Tipologia viaggio (ritiro, misto, consegna) |
| orders | Elenco ordini trasportati (type: **Order**) |

### Attributi di Vehicle

| Attributo | Descrizione |
| --- | --- |
| id  | ID univoco veicolo |
| licensePlate | Targa veicolo |
| companyId | ID azienda proprietaria |
| type | Tipo di veicolo: furgone, trattore, motrice, rimorchio, semirimorchio |
| brand | Marca del veicolo |
| model | Modello del veicolo |
| dimensions | Dimensioni veicolo (x, y, z) |
| createdAt | Data di creazione veicolo |
| updatedAt | Data ultimo aggiornamento veicolo |
| bulkhead | Veicolo dotato di paratia (nessuna, mobile o fissa) |
| tailLift | Veicolo dotato di sponda idraulica |
| fuel | Caruburante |
| spot | Posti disponibili sul mezzo |
| axle | Numero di assi |
| maxWeight | Massimo peso di carico |
| kilometers | Kilometri percorsi |
| booking | Elenco date impegnate del mezzo (funzionalità non disponibile) |
| status | Status veicolo |
| lastPosition | Ultima posizione rilevata |
| indipendent | Veicolo in grado di viaggiare in autonomia (true/false) |
| note | Note veicolo |

### Attributi di Customer

| Attributo | Descrizione |
| --- | --- |
| id  | ID univoco cliente |
| name | Ragione sociale cliente |
| vatNumber | Partita IVA cliente |
| searchable | Chiave di ricerca del cliente |
| companyCode | Codice aziendale azienda associata al cliente |
| ownerCompanyId | ID dell'azienda proprietaria del contatto |
| companyId | ID dell'azienda associata al cliente |
| tenant | ID account proprietario del contatto |
| isSender | Se il contatto è un committente (true/false) |
| isCarrier | Se il contatto è un vettore (true/false) |
| isReceiver | Se il contatto è un destinatario (true/false) |
| ~~relationships~~ | ~~SENDER, CARRIER, RECEIVER~~ |
| customPec | Indirizzo PEC inserito dal proprietario del contatto |
| customUniqueCode | Codice univoco inserito dal proprietario del contatto |
| customEmails | Contatti email del cliente |
| customPhones | Numeri di telefono del cliente |
| customTrades | Settori di operatività del cliente |
| note | Note cliente |
| company | Informazioni azienda associata al cliente |


### Order: Esempio di response

```
{
    "data": {
        "orderByCarrierStatusCompletedAt": {
            "items": [
                {
                    "id": "c9c335753de68f131b106f41151e848510dcdb25f70561bffbeb99e6fac7e343",
                    "extId": "659ab5fe-ecec-493b-9c1e-560745f41fa8",
                    "stamp": "ORD-DT7T0N26T62Q1EBF",
                    "name": "Ordine DT7T0N26T62Q1EBF",
                    "preOrderId": "7111e3dc442517072736c5ae71822be95af3d2206f8d18612607432bf5c6715a",
                    "carrierId": "1ba011aeed388201fa1ab142fb653b436b7fe7ae0fdd25dd1c13b535368fc910",
                    "receiverId": "6d3b3422cefb0063f11afeaffdf43e431f8ac99eeca88ffce035b6fc07efb875",
                    "senderId": "8a7a2f4e9e278044aa08a538780ef9458211f3cd5b59c162c22b0f036348a077",
                    "pickupStorageId": "8a7a2f4e9e278044aa08a538780ef9458211f3cd5b59c162c22b0f036348a077",
                    "deliveryStorageId": "6d3b3422cefb0063f11afeaffdf43e431f8ac99eeca88ffce035b6fc07efb875",
                    "carrierName": "LTS SRL",
                    "senderName": "MEGA AGENCY",
                    "receiverName": "GECOP SRL",
                    "pickupStorageName": "MEGA AGENCY",
                    "deliveryStorageName": "GECOP SRL",
                    "senderVat": "37821920398",
                    "carrierVat": "17281992878",
                    "receiverVat": "37827187627",
                    "pickupStorageVat": "37821920398",
                    "deliveryStorageVat": "37827187627",
                    "completedAt": "2022-12-01T12:30:37.497Z",
                    "paymentCondition": "SCONOSCIUTO",
                    "shipmentType": "GROUPAGE",
                    "billingType": "GROUPAGE",
                    "pickupCheckpoint": {
                        "extId": "0cb920c0-72b4-4d16-8f64-2a97c7052392",
                        "name": "Magazzino Ferrara",
                        "thirdCompanyId": null,
                        "thirdCompanyName": null,
                        "thirdCompanyVat": null,
                        "location": {
                            "place_id": "ChIJgcGmpFlOfkcR_AlqW-FKAiE",
                            "region": "Emilia-Romagna",
                            "province": "FE",
                            "city": "Ferrara",
                            "address": "Via Ravenna, 56, Ferrara, FE, 44124, Emilia-Romagna, Italia",
                            "coordinate": [
                                44.8212566,
                                11.6287324
                            ]
                        }
                    },
                    "pickupDateStart": "2022-12-05T08:00:00.000Z",
                    "pickupDateEnd": "2022-12-05T14:30:00.000Z",
                    "depotCheckpoint": {
                        "extId": "7aff1dbe-212d-469c-ab74-6aaf3674aadc",
                        "name": "Hub principale",
                        "thirdCompanyId": "",
                        "thirdCompanyName": "",
                        "thirdCompanyVat": "",
                        "location": {
                            "place_id": "ChIJ4RroTtM3JRMRlPhLIOMHkts",
                            "region": "Lazio",
                            "province": "FR",
                            "city": "Vallecorsa",
                            "address": "Via Roma, 432, Vallecorsa, FR, 03020, Lazio, Italia",
                            "coordinate": [
                                41.4440327,
                                13.4044254
                            ]
                        }
                    },
                    "depotDateStart": "2022-12-05T07:00:00.000Z",
                    "depotDateEnd": "2022-12-05T10:00:00.000Z",
                    "deliveryCheckpoint": {
                        "extId": "6a45050b-a752-4e5d-949a-88f11e020849",
                        "name": "supermercato frosinone",
                        "thirdCompanyId": "",
                        "thirdCompanyName": "",
                        "thirdCompanyVat": "",
                        "location": {
                            "place_id": "ChIJATn5wsZaJRMRoj5W4-TeS_I",
                            "region": "Lazio",
                            "province": "FR",
                            "city": "Frosinone",
                            "address": "Via Marittima, 534, Frosinone, FR, 03100, Lazio, Italia",
                            "coordinate": [
                                41.6291192,
                                13.3318537
                            ]
                        }
                    },
                    "deliveryDateStart": "2022-12-05T13:30:00.000Z",
                    "deliveryDateEnd": "2022-12-05T14:00:00.000Z",
                    "status": "DELIVERED",
                    "orderNumber": "323423",
                    "docs": [],
                    "support": "PALLET",
                    "quantity": 13,
                    "size": "CP2 - 80x120",
                    "loadingMeter": 5.2,
                    "grossWeight": 430,
                    "netWeight": 380,
                    "packages": 23,
                    "customer": {
                        "id": null,
                        "name": null,
                        "vatNumber": null,
                        "uniqueCode": null,
                        "pec": null
                    },
                    "palletInfo": [
                        {
                            "value": 13,
                            "size": "CP2 - 80x120",
                            "type": "EPAL",
                            "system": "PARI"
                        }
                    ],
                    "collectChecks": 0,
                    "checks": {
                        "items": []
                    },
                    "travels": {
                        "items": []
                    }
                }
            ],
            "nextToken": "..."
        }
    }
}
```

### Travel: Esempio di response

```
{
    "data": {
        "travelByCarrierStatusDepartureDate": {
            "items": [
                {
                    "id": "04e0f4611ac0793b113284d53bf3d52705bae5fa0410860246a3164d2b221f9a",
                    "stamp": "TRV-4M1GFKUI9Q0Q03M1",
                    "carrierId": "1ba011aeed388201fa1ab142fb653b436b7fe7ae0fdd25dd1c13b535368fc910",
                    "tenant": "4cfa9577-1a33-4739-8d3d-9c7b2a611d18",
                    "status": "STATIONARY",
                    "createdAt": "2022-12-23T11:32:10.482Z",
                    "departureDate": "2022-12-26T11:00:00.000Z",
                    "updatedAt": "2022-12-23T16:49:35.037Z",
                    "licensePlate": "DH376FH+HG746TJ",
                    "vehicleName": "IVECO STANDARD;TOYOTA CHR",
                    "driverFiscalCode": "RHSJDF83R09F837F",
                    "driverName": "NICOLA SPORTELLO",
                    "driver": {
                        "username": "33a4fd7db906b4c7c7b6cc49c0268d16594fa476e8f2fa863fbbce09ee0f9249",
                        "companyId": null,
                        "name": "NICOLA SPORTELLO",
                        "fiscalCode": "RHSJDF83R09F837F",
                        "email": "sportello@lts.it",
                        "phone": "3330193844",
                        "job": null,
                        "task": null,
                        "tenant": "4cfa9577-1a33-4739-8d3d-9c7b2a611d18"
                    },
                    "estimatedTravelTime": "11 ore 16 minuti",
                    "estimatedTravelLength": "1102 km",
                    "estimatedTransportCosts": null,
                    "start": {
                        "id": "start_04e0f4611ac0793b113284d53bf3d52705bae5fa0410860246a3164d2b221f9a",
                        "companyName": "LTS SRL",
                        "companyId": null,
                        "tenantCompany": "4cfa9577-1a33-4739-8d3d-9c7b2a611d18",
                        "estimatedLength": null,
                        "estimatedTime": null,
                        "completed": false
                    },
                    "waypoints": [
                        {
                            "id": "ChIJgcGmpFlOfkcR_AlqW-FKAiE_1671795109752",
                            "companyName": "MEGA AGENCY",
                            "companyId": "8a7a2f4e9e278044aa08a538780ef9458211f3cd5b59c162c22b0f036348a077",
                            "tenantCompany": "95f5c6a4-66bb-4a77-8ee2-701a9a53c32c",
                            "estimatedLength": "508 km",
                            "estimatedTime": "5 ore 7 min",
                            "completed": false
                        },
                        {
                            "id": "ChIJATn5wsZaJRMRoj5W4-TeS_I_1671795112757",
                            "companyName": "GECOP SRL",
                            "companyId": "6d3b3422cefb0063f11afeaffdf43e431f8ac99eeca88ffce035b6fc07efb875",
                            "tenantCompany": "NOT_OWNED",
                            "estimatedLength": "483 km",
                            "estimatedTime": "4 ore 41 min",
                            "completed": false
                        },
                        {
                            "id": "ChIJD4dPRHK8OhMReWCJjjS_x9w_1671795113392",
                            "companyName": "LTS SRL",
                            "companyId": "1ba011aeed388201fa1ab142fb653b436b7fe7ae0fdd25dd1c13b535368fc910",
                            "tenantCompany": "4cfa9577-1a33-4739-8d3d-9c7b2a611d18",
                            "estimatedLength": "57,7 km",
                            "estimatedTime": "41 min",
                            "completed": false
                        }
                    ],
                    "end": {
                        "id": "end_04e0f4611ac0793b113284d53bf3d52705bae5fa0410860246a3164d2b221f9a",
                        "companyName": "LTS SRL",
                        "companyId": null,
                        "tenantCompany": "4cfa9577-1a33-4739-8d3d-9c7b2a611d18",
                        "estimatedLength": null,
                        "estimatedTime": null,
                        "completed": false
                    },
                    "plannedOrderIds": [
                        "63a1bf4345bc9a5642b9e60c81705fec1b195c59e5565076a8cd2652609565f4",
                        "5c97ca1bdcb3ca61de604f765c9a876825cb08be010f9e936e336eb7aa6333b3",
                        "19071c6f93de9ff361a1c9e6ec7616d18b48f78b6669d3084e7c19163b1d0e50",
                        "00c7ad6ece5e995593a02790ecdc9ea2b133ef79bd60c657f7b97fb33d97fd2e"
                    ],
                    "travelType": "MIXED",
                    "orders": {
                        "items": [
                            {
                                "order": {
                                    "id": "fad6eac75046660516a2075c857594748c05a7dbf3cc49230f055666ce9b34eb",
                                    "stamp": "ORD-RP3B53FMS6740Q4R",
                                    "quantity": 6,
                                    "size": "CP2 - 80x120",
                                    "grossWeight": null,
                                    "netWeight": null
                                }
                            },
                            {
                                "order": {
                                    "id": "fad6eac75046660516a2075c857594748c05a7dbf3cc49230f055666ce9b34eb",
                                    "stamp": "ORD-RP3B53FMS6740Q4R",
                                    "quantity": 6,
                                    "size": "CP2 - 80x120",
                                    "grossWeight": null,
                                    "netWeight": null
                                }
                            },
                            {
                                "order": {
                                    "id": "84ae48b1418fcbdab3c254b7aa661925ce94b64c44a517c447dc3a1f3b7d4614",
                                    "stamp": "ORD-U0I6B8MXLM5YQF63",
                                    "quantity": 6,
                                    "size": "CP2 - 80x120",
                                    "grossWeight": 124,
                                    "netWeight": 120
                                }
                            },
                            {
                                "order": {
                                    "id": "84ae48b1418fcbdab3c254b7aa661925ce94b64c44a517c447dc3a1f3b7d4614",
                                    "stamp": "ORD-U0I6B8MXLM5YQF63",
                                    "quantity": 6,
                                    "size": "CP2 - 80x120",
                                    "grossWeight": 124,
                                    "netWeight": 120
                                }
                            }
                        ]
                    }
                }
            ],
            "nextToken": "..."
        }
    }
}
```

### Vehicle: Esempio di response

```
{
    "data": {
        "vehicleByCompany": {
            "items": [
                {
                    "id": "260706ff80ed6a168c079a857759a22be07b3f1159e89c53f15529cfb6760be3",
                    "licensePlate": "FG476GH",
                    "companyId": "50f0913f8030a048e47cc1b7842aca2977d15f77964a5cd2cf98f7e40dfa3fb5",
                    "type": "FURGONE",
                    "brand": "IVECO",
                    "model": "STANDARD",
                    "dimensions": {
                        "x": 2,
                        "y": 3,
                        "z": 2
                    },
                    "createdAt": "2022-12-01T08:55:01.739Z",
                    "updatedAt": "2022-12-01T08:55:01.739Z",
                    "bulkhead": "NESSUNA",
                    "tailLift": 0,
                    "fuel": "DIESEL",
                    "spot": 20,
                    "axle": 2,
                    "maxWeight": 12,
                    "kilometers": 271634,
                    "booking": null,
                    "status": "DISPONIBILE",
                    "lastPosition": {
                        "place_id": "ChIJs-zcJQy8OhMRz7yN7Kec7-A",
                        "region": "Lazio",
                        "province": "FR",
                        "city": "Cassino",
                        "address": "Via Enrico de Nicola, 61, Cassino, FR, 03043, Lazio, Italia",
                        "coordinate": [
                            41.4927165,
                            13.8292387
                        ]
                    },
                    "indipendent": true,
                    "note": ""
                }
            ],
            "nextToken": "..."
        }
    }
}
```

### Customer: Esempio di response

```
{
    "data": {
        "customerByCompany": {
            "items": [
                {
                    "id": "6bf9ccc99d3f0a5038c02c726e156fa055c03fe2e3655d669406f159f0c57ad4",
                    "name": "VANNI GROUP SRL ",
                    "vatNumber": "02526420597",
                    "searchable": "vanni group srl ",
                    "companyCode": "VNNGR#71163",
                    "ownerCompanyId": "50f0913f8030a048e47cc1b7842aca2977d15f77964a5cd2cf98f7e40dfa3fb5",
                    "companyId": "030ffec89d940c3ab0fa300299d4baab830a8cee9d23e29d8dc1e290eabe8954",
                    "tenant": "5ac6362c-3d49-4326-ac3f-499318dae086",
                    "isSender": 0,
                    "isCarrier": 1,
                    "isReceiver": 0,
                    "relationships": [
                        "CARRIER"
                    ],
                    "customPec": "",
                    "customUniqueCode": "",
                    "customEmails": [],
                    "customPhones": [],
                    "customTrades": [],
                    "note": "",
                    "company": {
                        "id": "030ffec89d940c3ab0fa300299d4baab830a8cee9d23e29d8dc1e290eabe8954",
                        "city": "Minturno",
                        "address": "Via Penitro, Minturno, LT, 04026, Lazio, Italia",
                        "uniqueCode": "",
                        "pec": "vannigroup@certipec.it",
                        "trades": [],
                        "type": "TRANSPORT",
                        "authorCustomersRaw": null,
                        "createdAt": "2022-11-24T10:08:29.320Z",
                        "updatedAt": "2022-11-24T10:08:29.320Z",
                        "companyCode": "VNNGR#71163",
                        "vatNumber": "02526420597",
                        "name": "VANNI GROUP SRL ",
                        "fiscalCode": "02526420597"
                    }
                }
            ],
            "nextToken": "..."
        }
    }
}
```
