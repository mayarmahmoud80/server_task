const UserDto = ({ _id, name, email, phoneNumber ,address}) => ({
    id: _id,
    name,
    email,
    phone: phoneNumber,
    address,
  });
  
  module.exports = {UserDto};