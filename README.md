# Kaffeemaschine
Für das Modul M254 wurde eine Kaffeemaschine in BPMN umgesetzt.

Team: Samuel Hajnik, Oliver Achermann und Raphael Blaauw

## Architektur
![Architektur](./diagrams/architektur.png)

## Use Cases
## BPMN Diagramm
![BPMN](./diagrams/BPMN_Diagramm.png)
## Test Cases
| Test Case ID |Name| Beschreibung                        | Input          | Expected Output       | Actual Output | Status |
|--------------|---|------------------------------------|----------------|-----------------|---------------|--------|
| TC_001       | Kaffee-Produkt auswählen            | Überprüfen Sie, ob der Kunde erfolgreich ein Kaffee-Produkt auswählen kann.  | Der Kunde interagiert mit der Auswahl-Schnittstelle und wählt ein Kaffee-Produkt aus.| Das ausgewählte Kaffee-Produkt wird vom System registriert. | | passed
| TC_002       | Menge auswählen            | Überprüfen Sie, ob der Kunde nach der Auswahl eines Kaffee-Produkts die Menge festlegen kann.   | Der Kunde wählt ein Kaffee-Produkt aus und gibt die Menge an.| Die ausgewählte Menge wird vom System registriert.              |        |         |
| TC_003       | Kaffeeherstellung mit ausreichendem Geld           | Überprüfen Sie, ob bei ausreichendem Geldbetrag der Kaffeeherstellungsprozess erfolgreich abgeschlossen wird.   |: Der Kunde hat ausreichend Geld für das ausgewählte Kaffee-Produkt. |Der Kaffeeherstellungsprozess wird erfolgreich abgeschlossen, und der Kunde erhält das gewünschte Getränk.               |        |         |
| TC_004       | Kaffeeherstellung mit unzureichendem Geld           | Überprüfen Sie, ob bei unzureichendem Geldbetrag der Kaffeeherstellungsprozess abgebrochen wird.   | Der Kunde hat nicht genügend Geld für das ausgewählte Kaffee-Produkt. | Der Kaffeeherstellungsprozess wird abgebrochen, und es wird dem Kunden mitgeteilt, dass nicht genügend Geld vorhanden ist.              |        |         |


## Reflexion
Lorem Ipsum
