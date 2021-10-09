const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});
var admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "linker-b4d39",
  "private_key_id": "fe18c1bfd79a7848c164ed0ca506f548958cc5f7",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClXn84ezvFPtZC\njO32ZOmTJ8vUJlTpSN/FxbUosmLUX4qww6ZVbvxyoWhvAMgh+zNM/hM7eiNRApjK\ni+LDiVQ4LtJp+ppvWtGmt2VmRXrtqAltRAUSOr8g9B6zDkwN8Xj2NVe48oEWrEuw\ncEfBUF7VsbnSWw7/FuH+nSY6wFQto3lCjvVZBwHiriLZq2Wh1+yOvvgpqTlQeDbZ\ne424Ofzp3zF59gLTSeyKWYPblZ209h27QPjF/PSlsrsqqx55w/K9ORMvfi6jVpcf\nr8pJT4xDdQarB1ksMcKXFpKO9UH7Rti0Y20Yw1ZvMUy92ukHdRpH/wA6mQg317/C\nPm8NZtqPAgMBAAECggEAEueOm6Ja3t2kGM+LlJNMsGnoP0RyiIiwLCfB4fkimyyg\n6jwzk6iwa1pQWgA44Mmav7577Fy2FNi7Jsx/C+NzIUkY/MyNQxWayfhFOz/OIcUH\n7tnLyp20o8vEhqunviBQt7S5ZocygqkHrg/n5A2QCdXbbFTEjhzLkRPd/vFlriHG\n2Z7NO9xeLJ961dQYUWtv4dkFCsRlOxABFOuQbk0N7gjXX0r4hqCpVA3dC6jiyzCE\nzMx2efUVe0f1r7INeYFExnAEq+YTBNBNJWj9SM4TtfoDBFXQQVZN+IyjM5hlVDxY\n/t+3Ta3Dx9QyaJTBml5HCsNBjE511aZFXhqZx7mjoQKBgQDd4+DBqlGkj/G/UCR5\nVwfxRdvaWkHmHyWnIK/iRGc14EDo2Ku9XgIqjUv/c+B/mw/+CAv8Xt38/Fuk0Nds\novv+aBdAlz2Dl3jlO78KqWTyKt83XXMLqcSCUzUpF+kMR2+CqSo3LYuD0M9l6EYm\nsEVo+ja+gS+yLTi22U4DTIeslQKBgQC+ylPCa9FQcQWq1smMkKnwt24FNxgNGESd\nfq9Uu/Bt0TY5C0XnXkcTbL9MloW+Jlw3BvK4qfjaZlFzTfHcXH8Gy1UblY/XpElU\nwOCqPc14vpdqfYZ6XoeEXtqWJrGyVRCzAyKVi+qMlaK/cbJ7BiPA2YbG3VuYU72v\nPFCCotJ9kwKBgCENKpNubU7X6iiXJXe1kQdNYpw5yYsfpJoqckh/6+fIiaKlc593\ne1cfSOy6M/yN+mnahP6ImwRuCrCYMx6JgIO6uYvze0Q4sddjeOd7p/+yhyFWGCbq\nmMzY3BhM6XfcxC1wSUuCyz9NQTdqy9hDdXNXogPqdlJSDhqeb9Jp+eOpAoGBAKG+\n1ZOV5DXWG3/h56yLWAcC+vrg4jr3v/PlWq7zRblUDCwAKpsjig4lu2gqk+fIjZT5\nBv0W3CoLZDHkeo7eu7H+34ArI28lkCWR/uVUz8T1j1hwYnmLekf2QknZM/yDsUyR\n89fkbkwQ75Bty2oQom7z+xbMwsI4/C57a6XUc66RAoGAdXJbrKWcatnigHPEhM9d\n23ph5zBck70jAnHph7uJxCwYFyZssA3nkDgiNMnjOJBkUVioklPfhxI/1qL2zbXx\nIt4QVaxKSxuDYlmaN84c5cbOA90DWVPZ09Y6bhY5zvAgUOiJE28Ao7MmMxACNJqt\nyOfwuT6AyGeEMz9jo5u6AwY=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-5qsaz@linker-b4d39.iam.gserviceaccount.com",
  "client_id": "117612412405278421308",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5qsaz%40linker-b4d39.iam.gserviceaccount.com",

}

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  

  apiKey: "AIzaSyAYdRXsA4PZl5zEt4jEIkw_ZzYlAEA3UaY",
  authDomain: "linker-b4d39.firebaseapp.com",
  projectId: "linker-b4d39",
  storageBucket: "linker-b4d39.appspot.com",
  messagingSenderId: "727805881473",
  appId: "1:727805881473:web:a8e8599494d35e67c6f180"
};
const defaultApp = admin.initializeApp(firebaseConfig);

const users = {}

const listAllUsers = (nextPageToken) => {
  // List batch of users, 1000 at a time.
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};
// Start listing users from the beginning, 1000 at a time.
listAllUsers();


io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})