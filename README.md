### ChaseMe
Идеята на ChaseMe е да намираш хора със сходни интереси в автомобилната индустрия.Можеш да търсиш и комуникираш с хора в определен радиус и да си организирате място за среща.

## Технологиите които ще използваме са:
- React-Native за app-a
- Typescript и Express за backend
- MongoDB бази данни

## Функционалности:
- Възможност за пращане на лични съобщения
- Интерактивна карта с потребители
- Възможност за swipe-ване със match-ване
- Потребителски настройки

## Разпределение:
- Виктор Колев - frontend
- Неделчо Панковски - backend


## TODO:
Map
- map - done
- location service - done
- map navigation + icon 
- request with active in radius of 1.5km
- get Active markers aka location.updatedAt in last 5 minutes. Add property in location model active(true, false)
- take a look at push notifications

- 

- every player updates constantly his location via the api and send it into the server
- server returns everyone only the near markers(set radius)(it will be calculated by formula or library)
- Ping-ing another player will make a ping request (senderUserId, receiverUserId, timestamp, message)
- if a player gets a ping, a notification should pop up with yes/no

Match screen 
- get 10 cards on loaded view
- get another 10 cards after swiping 7 of the previous
- if two players match they become friends and the friend appear in the list of friends 
    so on every swipe we send another request with the data and there will be the logic for this
- The friends will be listed in users collections and the polling function will compare the data if a new friend has come

Message Screen 
- list all the friends with chat history - done
- button chat to new friend - done
- chat Screen opens for the clicked user - done



