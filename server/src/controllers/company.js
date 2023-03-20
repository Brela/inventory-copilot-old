const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');

module.exports = {
  createCompany: async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    const { companyName } = req.body;
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    let company;
    try {
      const createCompany = await prisma.Company.create({
        data: {
          companyName: companyName,
          companyId: randomNumber,
        },
      });
      company = createCompany;
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
    }
    return res.json(company);
  },
  getCompanies: async (req, res) => {
    let companies;
    try {
      companies = await prisma.Company.findMany({
        include: {
          products: true, // Return all fields
        },
      });
    } catch (error) {
      console.log('Error Found: ', error);
      return res.json(error);
    }
    return res.json(companies);
  },
};
