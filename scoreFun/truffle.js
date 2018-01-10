module.exports = {
  networks: {
  development: {
  host: "localhost",
  port: 8545,
  network_id: "*" // Match any network id
 },
 production: {
   //place host url below
   host: "",
   port: 8545,
   network_id: "*"
 }
}
};