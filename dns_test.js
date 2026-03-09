const dns = require('dns');

dns.resolveSrv('_mongodb._tcp.cluster0.x1lq1vc.mongodb.net', (err, addresses) => {
    if (err) {
        console.error('SRV Resolution Error:', err);
    } else {
        console.log('SRV Records found:', addresses);
    }
});
