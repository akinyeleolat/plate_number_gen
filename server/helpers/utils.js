/* eslint-disable no-plusplus */
import Validator from 'validatorjs';
import statesData from '<helpers>/data';

export const randomString = (length, chars) => {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getFrontCode = () => {
  const fcode = randomString(2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  return fcode;
};

export const getMidCode = (min, max) => {
  const num = getRandomInt(min, max);
  return num;
};

export const getLGACode = (stateName) => {
  const lgaData = statesData.find(x => x.state === stateName);
  if (lgaData) {
    const { lga } = lgaData;
    const lgaCode = lga[Math.floor(Math.random() * lga.length)];
    return lgaCode;
  }
  return false;
};

export const uuidFormat = 'regex:/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[34][0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/';

/**
 * @param {object} inputObject
 * @return {object} formattedObject
 */
export const toLowerCaseAndTrim = (inputObject) => {
  const formattedObject = {};
  Object.entries(inputObject).forEach((element) => {
    const key = element[0];
    const value = element[1];
    formattedObject[key] = value.replace(/\s/g, '').toLowerCase();
  });
  return formattedObject;
};

/**
 * check Validation function
 * @param {Object} data - data to be validated
 * @param {Object} rules - rules for validation
 * @returns {Boolean} true - if validation passes
 * @returns {Object} error Object - if validation falis
 */
export const checkValidation = (data, rules) => {
  const validation = new Validator(data, rules);
  if (validation.passes()) {
    return true;
  }
  return {
    error: {
      status: 400,
      message: validation.errors.all()
    }
  };
};

/**
 * Display error
 * @param {Object} err
 * @param {Object} res
 * @param {number} status
 * @returns {Object} response body - statusCode and errorMessage
 */
export const displayError = (err, res, status = 400) => {
  res.status(status).json({
    status,
    message: err.message
  });
};

/**
 * validate endpoint
 * @param {Object} data - data to be validated
 * @param {Object} rules - rules for validation
 * @param {Object} response - response body
 * @param {Object} nextFunction - call next function middleware
 * @returns {Boolean} true - if validation passes
 * @returns {Object} error Object - if validation fails
 */
export const validate = (data, rules, response, nextFunction) => {
  const check = checkValidation(data, rules);
  return check === true ? nextFunction() : displayError(check.error, response);
};


/**
 * @param {object} data
 * @param {string} message
 * @param {object} res
 * @param {number} status
 * @return {object} response
 */
export const handleSuccessResponse = (data, message, res, status = 200) => (
  res.status(status).json({
    status: 'success',
    message,
    data
  })
);

/**
 * @param {object} data
 * @param {string} message
 * @param {object} res
 * @param {string} status
 * @param {number} statusCode
 * @return {object} response
 */
export const handleResponse = (data, message, res, status, statusCode) => (
  res.status(statusCode).json({
    status,
    message,
    data
  })
);
