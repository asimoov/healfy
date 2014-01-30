require('../helper');
var app = require('../../app');
var request = require('superagent');
var expect = require('expect.js')

describe('patients', function() {
	describe('GETs', function() {
		it('GET /patients', function(done) {
			request.get('http://localhost:3001/patients').end(function(res) {
				expect(res).to.exist
				expect(res.status).to.equal(200);
				done();
			});
		});

		it('GET /patients/1', function(done) {
			request.get('http://localhost:3001/patients/1').end(function(res) {
				expect(res).to.exist
				expect(res.status).to.equal(200);
				done();
			});
		});
	});

	describe('POST', function() {
		it('POST /patients', function(done) {
			request.post('http://localhost:3001/patients')
				.send({"name": "Denis", "rg": "55.555.555-55", "status": 0, "cpf": "555.555.555-55", "birthday": "2014-01-31T00:00:00.000Z", "sex": 0, "street": "Alto do abaete", "number": "2", "city": "Salvador", "district": "Itapua", "state": "BA", "cep": "55.555-555", "complement": "casa"})
				.end(function(res) {
				expect(res).to.exist
				expect(res.status).to.equal(201);
				done();
			});
		});
	});

	describe('PUT', function() {
		it('PUT /patients', function(done) {
			request.put('http://localhost:3001/patients/1')
				.send({"name": "Denis Guedes"})
				.end(function(res) {
				expect(res).to.exist
				expect(res.status).to.equal(200);
				done();
			});
		});
	});

	describe('DELETE', function() {
		it('DELETE /patients', function(done) {
			request.delete('http://localhost:3001/patients/1')
				.end(function(res) {
				expect(res).to.exist
				expect(res.status).to.equal(200);
				done();
			});
		});
	});
});