%module example
 %{
 extern void user_connect(char user[],char date[]);
 extern void etat_periph(char periph[],char data[],char user[],char date[]);
 extern void turn_periph(int composant,int etat);
 
 %}
 
 extern void user_connect(char user[],char date[]);
 extern void etat_periph(char periph[],char data[],char user[],char date[]);
 extern void turn_periph(int composant,int etat);
 
