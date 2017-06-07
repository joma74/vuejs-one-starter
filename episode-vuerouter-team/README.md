# TBD, heavy experimenting

#### Multiple paramter usage
See `makejs#TEST_RUN` and `makejs#destructureArgs` for the replacment
application of `envVars`

```js
yarn run test -- envVars="NODE_ENV=development DEBUG=vuerouter.team"
```
may result in
```bash
exec cross-env DEBUG_COLORS=true NODE_ENV=development DEBUG=vuerouter.team mocha --opts src/test/mocha.opts --colors  $(find src/test/js/ -name "*.spec.js")
```
