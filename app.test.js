const request = require('supertest');
const app = require('./app');

describe('CRUD API endpoints', () => {
  let user;
  let updatedUser;

  beforeAll(() => {
    user = {
        "gender":"female",
        "name": {
            "title":"Ms",
            "first":"Ceyhan",
            "last":"Koç"
        },
        "location": {
                "street": {
                    "number":7526,
                    "name":"Talak Göktepe Cd"
                },
                "city":"Isparta",
                "state":"Karabük",
                "country":"Turkey",
                "postcode":99859,
                "coordinates": {
                    "latitude":"70.8780",
                    "longitude":"165.1690"
                },
                "timezone": {
                    "offset":"+3:00",
                    "description":"Baghdad, Riyadh, Moscow, St. Petersburg"
                }
            },
        "email":"ceyhan.koc@example.com",
        "login": {
                "uuid":"38b8c46f-fbc4-41c2-b0ea-241d1f9df434",
                "username":"redcat331",
                "password":"tyson",
                "salt":"UWqeXlnb",
                "md5":"2193b9871aea3041fd6a50f5d40f883d",
                "sha1":"d3a591933efe96affc79ee38da4ee2c52659dae6",
                "sha256":"17cc4a70e593384baae8f5f2c15c0851d144ea7e79ec2ed9366dca29ebbd788a"},
            "dob": {
                "date":"1949-10-05T21:14:47.986Z",
                "age":73
            },
            "registered":{
                "date":"2019-08-02T05:53:08.260Z","age":3
            },
            "phone":"(968)-922-2140",
            "cell":"(789)-231-5960",
            "id": {
                "name":"",
                "value":null
            },
            "picture":{
                "large":"https://randomuser.me/api/portraits/women/7.jpg",
                "medium":"https://randomuser.me/api/portraits/med/women/7.jpg",
                "thumbnail":"https://randomuser.me/api/portraits/thumb/women/7.jpg"
            },
            "nat":"TR"
        };

    updatedUser = {
        email: 'updated.user@example.com'
    };
  });

  it('should create a new user - POST /newuser', async () => {
    const response = await request(app).post('/newuser').send(user);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
  });

  it('should return all users - GET /getusers', async () => {
    const response = await request(app).get('/getusers');
    expect(response.status).toBe(200);
    expect(response.body.results.length).toEqual(6);
  });

  it('should return a specific user by username - GET /getuser/:username', async () => {
    const response = await request(app).get('/getuser/redcat331');
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual(user);
  });

  it('should update a specific user by username - PUT /user/:username', async () => {
    const response = await request(app).put('/user/redcat331').send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User updated successfully');

    // Verify that the user has been updated
    const getUserResponse = await request(app).get('/getuser/redcat331');
    expect(getUserResponse.status).toBe(200);
    expect(getUserResponse.body[0].email).toBe(updatedUser.email);
  });

  it('should delete a specific user by username - DELETE /user/:username', async () => {
    const response = await request(app).delete('/user/redcat331');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');

    // Verify that the user has been deleted
    const getUserResponse = await request(app).get('/getuser/redcat331');
    expect(getUserResponse.status).toBe(404);
    expect(getUserResponse.body.message).toBe('User not found');
  });

  afterAll((done) => {
    app.close(done);
  });
});
