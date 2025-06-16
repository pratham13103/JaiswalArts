I] Setup Frontend using the commands given in README.md in Client folder

II] Setup Database using these commands :
1)download the .dump file given 
2)open command prompt in that folder where you downloaded the .dump file 
3)in cmd type first command :  "C:\Program Files\PostgreSQL\17\bin\createdb.exe" -U postgres artshop 
4)you will be asked for password type your password of pgAdmin 
5)in cmd type second command : "C:\Program Files\PostgreSQL\17\bin\pg_restore.exe" -U postgres -d artshop -Fc "path to your dump folder\artshop_backup.dump" (replace path to your dump folder with actual path)
6)you will be asked the password, type the password of pgAdmin again
7)Your Database will be setup successfully 

III] Setup Backend using the commands given in README.md in Server folder
