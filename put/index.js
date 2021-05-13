'use strict';

const uuid = require('uuid').v4;
const dynamoose = require('dynamoose');
const PeopleModel = require('./people.schema.js');

exports.handler = async (event, id) => {
  try {
    const id = event.queryStringParameters && event.queryStringParameters.id;

    let data;

    const list = await PeopleModel.query('id').eq(id).exec();
    data = list[0];

    data.name = event.body.name;
    data.phone = event.body.phone;
    data.save();
   
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (e) {
    return {
      statusCode: 500,
      response: e.message
    }
  }
}