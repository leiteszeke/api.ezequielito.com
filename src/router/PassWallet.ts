import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { PKPass } from 'passkit-generator';

const PassWalletRouter = Router();

const certDirectory = path.resolve(process.cwd(), 'cert/PassWallet');
const wwdr = fs.readFileSync(path.join(certDirectory, 'wwdr.pem'));
const signerCert = fs.readFileSync(path.join(certDirectory, 'signerCert.pem'));
const signerKey = fs.readFileSync(path.join(certDirectory, 'signerKey.pem'));

PassWalletRouter.post('/', async (req, res) => {
  const {
    platform = 'android',
    name = 'Ezequiel',
    lastName = 'Leites',
    role = 'Player',
    rc = 1,
    pc = 1,
    cossyId = '0400089656',
    masterDuelId = 'XXX-XXX-XXX',
    duelLinksId = 'XXX-XXX-XXX',
  } = req.body;

  // Generate the pass
  const pass = await PKPass.from(
    {
      model: path.resolve(
        process.cwd(),
        `src/passes/${role.toLowerCase()}.pass`
      ),
      certificates: {
        wwdr,
        signerCert,
        signerKey,
        signerKeyPassphrase: 'demo',
      },
    },
    {
      serialNumber: cossyId,
    }
  );

  // Adding some settings to be written inside pass.json
  pass.setBarcodes({
    message: cossyId,
    altText: cossyId,
    format: 'PKBarcodeFormatCode128',
  });

  pass.primaryFields.push({
    key: 'fullName',
    label: 'Nombre y Apellido',
    value: `${name} ${lastName}`,
  });

  pass.secondaryFields.push({
    key: 'cossyId',
    label: 'COSSY ID',
    value: cossyId,
  });

  if (role === 'Judge') {
    pass.auxiliaryFields.push({
      key: 'role',
      label: 'Judge Level',
      value: `RC-${rc} | PC-${pc}`,
      textAlignment: 'PKTextAlignmentCenter',
    });
  }

  if (masterDuelId) {
    pass.auxiliaryFields.push({
      key: 'masterDuel',
      label: 'Master Duel ID',
      value: masterDuelId,
      textAlignment: 'PKTextAlignmentCenter',
    });
  }

  if (duelLinksId) {
    pass.auxiliaryFields.push({
      key: 'duelLinks',
      label: 'Duel Links ID',
      value: duelLinksId,
      textAlignment: 'PKTextAlignmentCenter',
    });
  }

  // pass.backFields.push({
  //   key: 'tournament1',
  //   value: '1st Place YACS 25th Anniversary',
  // });

  if (platform === 'ios') {
    res.header('Content-Type', 'application/vnd-apple.pkpass');

    res.send(pass.getAsBuffer());

    return res.end();
  }

  fs.writeFileSync(`./cossy/${cossyId}.pkpass`, pass.getAsBuffer());

  return res.json({
    url: `./cossy/${cossyId}.pkpass`,
  });
});

PassWalletRouter.get('/:cossyId', async (req, res) => {
  return res.download(`./cossy/${req.params.cossyId}.pkpass`);
});

export default PassWalletRouter;
