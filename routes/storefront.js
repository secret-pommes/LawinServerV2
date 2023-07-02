const express = require("express");
const app = express.Router();
const Profile = require("../model/profiles.js");
const Friends = require("../model/friends.js");
const functions = require("../structs/functions.js");

const { verifyToken } = require("../tokenManager/tokenVerify.js");
const keychain = require("../responses/keychain.json");

app.get("/fortnite/api/storefront/v2/catalog", (req, res) => {
  if (req.headers["user-agent"].includes("2870186")) {
    return res.status(404).end(); // OT6.5
  }
  //res.json(functions.getItemShop());
  res.redirect("https://api.nitestats.com/v1/epic/store");
});

app.get(
  "/fortnite/api/storefront/v2/gift/check_eligibility/recipient/:recipientId/offer/:offerId",
  verifyToken,
  async (req, res) => {
    const findOfferId = functions.getOfferID(req.params.offerId);
    if (!findOfferId)
      return error.createError(
        "errors.com.epicgames.fortnite.id_invalid",
        `Offer ID (id: "${req.params.offerId}") not found`,
        [req.params.offerId],
        16027,
        undefined,
        400,
        res
      );

    let sender = await Friends.findOne({
      accountId: req.user.accountId,
    }).lean();

    if (
      !sender.list.accepted.find(
        (i) => i.accountId == req.params.recipientId
      ) &&
      req.params.recipientId != req.user.accountId
    )
      return error.createError(
        "errors.com.epicgames.friends.no_relationship",
        `User ${req.user.accountId} is not friends with ${req.params.recipientId}`,
        [req.user.accountId, req.params.recipientId],
        28004,
        undefined,
        403,
        res
      );

    const profiles = await Profile.findOne({
      accountId: req.params.recipientId,
    });

    let athena = profiles.profiles["athena"];

    for (let itemGrant of findOfferId.offerId.itemGrants) {
      for (let itemId in athena.items) {
        if (
          itemGrant.templateId.toLowerCase() ==
          athena.items[itemId].templateId.toLowerCase()
        )
          return error.createError(
            "errors.com.epicgames.modules.gamesubcatalog.purchase_not_allowed",
            `Could not purchase catalog offer ${findOfferId.offerId.devName}, item ${itemGrant.templateId}`,
            [findOfferId.offerId.devName, itemGrant.templateId],
            28004,
            undefined,
            403,
            res
          );
      }
    }

    res.json({
      price: findOfferId.offerId.prices[0],
      items: findOfferId.offerId.itemGrants,
    });
  }
);

app.get("/fortnite/api/storefront/v2/keychain", (req, res) => {
  res.json(keychain);
});

app.get("/catalog/api/shared/bulk/offers", (req, res) => {
  res.json({
    accountId: "fake_account_id",
    calculateTax: false,
    lineOffers: [
      { offerId: "e71cc6639f0b427fa74a3947363759e9", quantity: 1 },
      { offerId: "48d86bc0a3634a33aa20817fdbfff917", quantity: 1 },
      { offerId: "262ac706b78f492f86661c61d8d1c135", quantity: 1 },
      { offerId: "0d346f08b60b45f1a64cb5c62c8c0a89", quantity: 1 },
      { offerId: "24f4bb5bda1e438487706aad6a4332d2", quantity: 1 },
      { offerId: "bf5dfcaa2e354fc482142f6ee0fcd61f", quantity: 1 },
      { offerId: "dbe63c184ad44514820a8b06f0c51f10", quantity: 1 },
      { offerId: "e3538394519548ee85b04ecbd41f620f", quantity: 1 },
      { offerId: "d2da86026c71429a9cf5e76dfd89a1d3", quantity: 1 },
      { offerId: "c8319a037f9840e8b7549de480efb9c7", quantity: 1 },
      { offerId: "b0892a99f96b43f88f42eb14035e863d", quantity: 1 },
      { offerId: "992ba7f52f3b40d49a4411fbade69b33", quantity: 1 },
      { offerId: "b207de06940944469b55633f1a8756e2", quantity: 1 },
      { offerId: "97a6db55099d44009f987f8671920754", quantity: 1 },
      { offerId: "5ae4edeb9aa2461cad980b5ff59b3099", quantity: 1 },
      { offerId: "775603a570324885a56762ea81bff788", quantity: 1 },
      { offerId: "755cfa1663154c35a2ddcc94c07165db", quantity: 1 },
      { offerId: "c005e7b9b1fb4f53a04e747d59ce75d2", quantity: 1 },
      { offerId: "ea8bba06cfee427ea0d0b65953438f92", quantity: 1 },
      { offerId: "493dd27f9efa42aa89a25c1400c02a29", quantity: 1 },
      { offerId: "e2f25dae43604a839dd6f2c21b675d5e", quantity: 1 },
      { offerId: "ea6187af5efe4648bd834a92a69e24be", quantity: 1 },
      { offerId: "411a9188ef584588b935b2d4f43a2325", quantity: 1 },
      { offerId: "2eb58adefbba454ba1dab2d530536403", quantity: 1 },
      { offerId: "6ee17fb4a2554841aaa300b94ffca2d1", quantity: 1 },
      { offerId: "3f62ba5e95f34bf287c06cfd70a8626d", quantity: 1 },
      { offerId: "04e522517a384a509d5bf31904846159", quantity: 1 },
      { offerId: "41134f4ff35a45a4923604cbb15e487d", quantity: 1 },
      { offerId: "f6be60bb6e8e48a0ba4bf3c59e9a5924", quantity: 1 },
      { offerId: "8ca6dbe417c9470783e9e2293cc0f4a9", quantity: 1 },
      { offerId: "9f85a5d097764566aa0316f86994dd91", quantity: 1 },
      { offerId: "ee372cda728446e989e63967c0108105", quantity: 1 },
      { offerId: "e0eb828f54c045699e68c74817bcb638", quantity: 1 },
      { offerId: "d3acf48fb4f549f994780e8f94bcbb7f", quantity: 1 },
      { offerId: "e203ac8b2d364f12bf6cea32d4bf0f3d", quantity: 1 },
      { offerId: "5f464fcc96764708a54882abc0775e3d", quantity: 1 },
      { offerId: "4a238a27ef134a60bbaf2fbccb5bfad0", quantity: 1 },
      { offerId: "c9b85ecb45ee4ee584bdc184c19b9655", quantity: 1 },
      { offerId: "c3610a6dc47c40cf980cdbe5722de4a4", quantity: 1 },
      { offerId: "813ef95fd7a54fe1b455b4357755e11b", quantity: 1 },
      { offerId: "e5e13165d3944a20ab3732ff1e5b3874", quantity: 1 },
      { offerId: "10628a9e5f9b4a5c94f1fe7ad5d0438b", quantity: 1 },
      { offerId: "16178da6de794c8d86300a607ec1bda6", quantity: 1 },
      { offerId: "319303d6de9544fd92cf7856ebd6e932", quantity: 1 },
      { offerId: "71a6102c3104441589fd54ee9327fe24", quantity: 1 },
      { offerId: "9c586c23738541ba96fc2c458b74558f", quantity: 1 },
      { offerId: "f30f517b073e4e2e88a2b2d6fedd6d05", quantity: 1 },
      { offerId: "d900ad5da7ec4eac86918bcfa0c3e698", quantity: 1 },
      { offerId: "233ab6e08b694608a2f82466d94d57d0", quantity: 1 },
      { offerId: "9f030fa7f1e74219babac65494c69c4f", quantity: 1 },
      { offerId: "a7f72b598c9a4fd98350c4884d6ca057", quantity: 1 },
      { offerId: "397d63f6f73f4bb1b6628716a08d0c4b", quantity: 1 },
      { offerId: "559f2ba95f874ec987d0ebfd2cc9c70a", quantity: 1 },
      { offerId: "9ec21a8d4f744f8b938fbf79d02d40b9", quantity: 1 },
      { offerId: "85125898f3914946a9443bcce4667660", quantity: 1 },
      { offerId: "8aa3c4ce744d41bfbfcffbe00be06850", quantity: 1 },
      { offerId: "84aba7b08b734e7c90a0112173b1f7fb", quantity: 1 },
      { offerId: "ae230025ab0f4b578d605569746233e5", quantity: 1 },
      { offerId: "4daadb392f1c4ee2b5a3af443e614d2a", quantity: 1 },
      { offerId: "69422bf51a694caca994436621abcaba", quantity: 1 },
      { offerId: "f05c43f7c1d24f5fbb1a6fa5a5a60edb", quantity: 1 },
      { offerId: "643a99a2bb504eb39e9e9469348aa673", quantity: 1 },
      { offerId: "9c823c76c5e94c62b4d6a0616c56aebd", quantity: 1 },
      { offerId: "b72d8cdfef8d405185751bece93fcbd1", quantity: 1 },
      { offerId: "b787584e9b134eafb01115908a442aeb", quantity: 1 },
      { offerId: "48e7be9d5a834f498da5799749db5836", quantity: 1 },
      { offerId: "f5c0e8ab6c9a4530999041e89e9b6934", quantity: 1 },
      { offerId: "bc104d187b194964b9ce0259bfefcd24", quantity: 1 },
      { offerId: "bfa82be4e0f446e6a0276a5ac5caf321", quantity: 1 },
      { offerId: "9f24bc6b5d974a7bb1303b9025486078", quantity: 1 },
      { offerId: "a4f240d86da746518af5d04da7a9f0e0", quantity: 1 },
      { offerId: "56ba62d3600d498cb2e01961dbf42927", quantity: 1 },
      { offerId: "855e964df8024a84a5776ce595275ae6", quantity: 1 },
      { offerId: "3fd8d621af4e4868a26a51bcb21febae", quantity: 1 },
      { offerId: "d74ab51d2bcf46888b3b15f3a18098a5", quantity: 1 },
      { offerId: "ede05b3c97e9475a8d9be91da65750f0", quantity: 1 },
      { offerId: "b217d78d2e0947bf8ded0fb379d7be46", quantity: 1 },
      { offerId: "c8471dbdb45f4e9e9727e4f9084822d6", quantity: 1 },
      { offerId: "0dca75cd5e6d47fabf4883e65bce6c13", quantity: 1 },
      { offerId: "3aedd91fbcd545e48f02129b1a5322fa", quantity: 1 },
      { offerId: "8e88d16eab9a40da8a16bf5b4b2ecfe8", quantity: 1 },
      { offerId: "494b1e73046543d6ba53c4574fd1b54c", quantity: 1 },
      { offerId: "ad448054b8ac490990e6d2e1227fef11", quantity: 1 },
      { offerId: "eddfb433b54b416c910c59691ba1e4cc", quantity: 1 },
      { offerId: "1c8a96b741484198b6a773b4d11fd048", quantity: 1 },
      { offerId: "77869fdbd7e14d80b486dc017d954c6f", quantity: 1 },
      { offerId: "293cc46d60924c79a7910ac87d930e58", quantity: 1 },
      { offerId: "39fba8c88d0647b29309874e6f7d4de9", quantity: 1 },
      { offerId: "eb7332137e56427ea8847ee46a0562ce", quantity: 1 },
      { offerId: "57f0419c4e4a4ea4858b2f37a98d5315", quantity: 1 },
      { offerId: "9badb86d048a452680bbe15b8097855a", quantity: 1 },
      { offerId: "3f1e339fdaa24894a99c1db9f6815db4", quantity: 1 },
      { offerId: "8e9937437c044c7e9628ae088af4a295", quantity: 1 },
      { offerId: "9aa9f44cd8c24652953a1b204755b193", quantity: 1 },
      { offerId: "a40d8f5f511045aba8be343b87849abd", quantity: 1 },
      { offerId: "6d28ba7c952b412d82120efcdcc9c233", quantity: 1 },
      { offerId: "7438471715774483b26a7990c393be37", quantity: 1 },
      { offerId: "a0448e4ce9cb40b68ed35b8a729aa150", quantity: 1 },
      { offerId: "d9a68c11db614eefb6f340b2d60592d7", quantity: 1 },
      { offerId: "77da03157c38443e991a72264ee5f23b", quantity: 1 },
      { offerId: "48a61f0d493942909a529369a66f803b", quantity: 1 },
      { offerId: "d0b97fb6c8c947a7bb407ef9174fc4e1", quantity: 1 },
      { offerId: "5cd3a2123244476499d41ff480ed9340", quantity: 1 },
      { offerId: "f7be1ff252f74e29aa8e49226e3758d7", quantity: 1 },
      { offerId: "f33b8f2906bb4ea9b2ae7a6d8e2e78c9", quantity: 1 },
      { offerId: "3b4c5df9efa5415b941cf74262865e4e", quantity: 1 },
      { offerId: "3c552303884b4d69b9bcd4c410ee0130", quantity: 1 },
      { offerId: "b587eca883944eda861a4542e1d4fb6a", quantity: 1 },
      { offerId: "3c8c7982474145e9ab639354fdbf628d", quantity: 1 },
      { offerId: "abb65726a6934e8abc2a57e30add0926", quantity: 1 },
      { offerId: "09c1dbdf491d4b60b1991de8b3770ef1", quantity: 1 },
      { offerId: "e20b34b90bc64291a3596584b22028bc", quantity: 1 },
      { offerId: "35759d71512b47e5b2825669f1d9166a", quantity: 1 },
      { offerId: "e852b1940299435884365cec7dc3a608", quantity: 1 },
      { offerId: "3cfa7c7589534bad8423a733eace00d9", quantity: 1 },
      { offerId: "eca7c7c9c7bc4de69f24d8507cc34ff8", quantity: 1 },
      { offerId: "5751d4fec6464315b915bfec8e48b271", quantity: 1 },
      { offerId: "38ce28f71244426c807d0f52b151f351", quantity: 1 },
      { offerId: "6242854fa2b4445b9751b42e7da0ca35", quantity: 1 },
    ],
    country: "DE",
  });
});

module.exports = app;
