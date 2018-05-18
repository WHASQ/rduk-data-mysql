require('dotenv').load({path: process.env.PWD + '/.local/.env'})

const Queryable = require('@rduk/data/lib/queryable');
const SourceExpression = require('@rduk/data/lib/expression/source');

const users = new Queryable(new SourceExpression('clicwalk_admins'))

users
  .filter(u => u.email === this.email)
  .select(u => ({
    id: u.id,
    email: u.email,
    fullName: u.name,
    password: u.password
  })).first({
    email: 'kim.ung@clicandwalk.com',
  }).then(user => {
    console.log(user.fullName)
  })
