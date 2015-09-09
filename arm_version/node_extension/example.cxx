#include <stdio.h>
#include<string.h>
#include <unistd.h>
#include <stdlib.h>

void user_connect(char user[],char date[]){

char str[255];
char str1[]="node_extension/files/";
 snprintf(str, 255, "%s%s-%s.txt", str1, user, date);


FILE* fichier=NULL;
fichier=fopen(str,"a+");
if(fichier == NULL) 
{
printf ("error\n");
 return;
}
fprintf(fichier,"******new user connected**************\n");
fprintf(fichier,"user: %s connected at : %s \n",user,date);
fclose(fichier);

}

void etat_periph(char periph[],char data[],char user[],char date[]){


char str[255];
char str1[]="node_extension/files/";
 snprintf(str, 255, "%s%s-%s.txt", str1, user, date);

FILE* fichier=NULL;
fichier=fopen(str,"a+");
fprintf(fichier,"********state of peripherics***************\n");
fprintf(fichier,"%s is %s",periph,data);
fprintf(fichier,"\n");
fclose(fichier);

}

void turn_periph(int composant,int etat){

	if( composant == 2){
		system(" echo 56 > /sys/class/gpio/export");
		if(etat == 1){
		system("echo high > /sys/class/gpio/gpio56/direction");
		}
		else
		{
                 system("echo low > /sys/class/gpio/gpio56/direction");
                 }
		
	}
	else if (composant == 3)
	{
       
		system(" echo 54 > /sys/class/gpio/export");
		if(etat == 1){
		system("echo high > /sys/class/gpio/gpio54/direction");
		}
		else
		{
                 system("echo low > /sys/class/gpio/gpio54/direction");
                 }
	}
	else
	{
	system(" echo 55 > /sys/class/gpio/export");
		if(etat == 1){
		system("echo high > /sys/class/gpio/gpio55/direction");
		}
		else
		{
                 system("echo low > /sys/class/gpio/gpio55/direction");
                 }
	}
}



