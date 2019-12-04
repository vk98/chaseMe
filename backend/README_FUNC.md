### Функционалност 

## navigation 
- map
- match players
- settings
- friends 
## 1st screen
- Google map with filter capable of seeing other users in radius of 1km(configurable)

## 2nd screen 
- Matching - swipe to the left and right. Match if the other one has liked you. 
- Filter by Location.
- Api should store last location of the user. 
- 

## 3rd screen
- Friends
- Load all friends
- add friend (by username OR email)
- remove friend 
- click on friend and load the conversation between them 
- searchForFriend(criteria)

## 4th screen 
- Change settings and POST all of them to the backend and rewrite them on 




### Models 

Users
name: String
email: String
password: String
lastLocation: Location
friends: user_id[]
Settings: Settings

Car
name: String,
brand: String,
model: String,
hp: Number,
picture: Base64String


Settings: 
profilePicture
