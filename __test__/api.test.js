const {app} = require('../app/app.js');
const request = require("supertest");

describe('TESTING API statusCode', () => {
  it("GET /reviews", (done) => {
    //jest.setTimeout(9000);
    request(app)
    .get('/reviews?product_id=37311')
    .then((res) => {
      expect(res.statusCode).toBe(200);

    })
    done();
  });

  it("GET /reviews/meta", (done) => {
    //jest.setTimeout(9000);
    request(app)
    .get('/reviews/meta?product_id=37311')
    .then((res) => {
      expect(res.statusCode).toBe(200);
    })
    done();
  });

  it("PUT /reviews helpful", (done) => {
    //jest.setTimeout(9000);
    request(app)
    .put('/reviews/1/helpful')
    .then((res) => {
      expect(res.statusCode).toBe(204);
    });
    done();
  });

  it("PUT /reviews reported", (done) => {
    //jest.setTimeout(9000);
    request(app)
    .put('/reviews/1/reported')
    .then((res) => {
      expect(res.statusCode).toBe(204);
    });
    done();
  });

  it("POST /reviews reported", (done) => {
    //jest.setTimeout(9000);
    request(app)
    .post('/reviews')
    .then((res) => {
      expect(res.statusCode).toBe(201);
    })
    done();
  });
});

