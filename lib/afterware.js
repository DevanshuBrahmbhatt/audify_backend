class AfterWare {
	static async sendResponse (request, response, code = 500, data = {}) {
		return response.status(code).json(data);
	}
}

module.exports = AfterWare;
