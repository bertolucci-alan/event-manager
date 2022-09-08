describe('User functional test', () => {
  describe('When create a new user', () => {
    it('should return successfully when create a new user', async () => {
      const newUser = {
        name: 'Alan',
        email: 'alan@gmail.com',
        password: '123',
        balance: 0,
        isAdmin: false,
      };
      const response = await global.testRequest
        .post('/api/users')
        .send(newUser);
      console.log(response);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(newUser));
    });
  });
});
