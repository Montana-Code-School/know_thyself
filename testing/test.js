const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const mocha = require('mocha');
const chai = require('chai');
const assert = require( 'chai' ).assert;

const site = 'https://knowthyself-mtcs.herokuapp.com'
const email_login = 'fake@email.com'
const login_password = 'passwordpassword'
const secret = 'red'
const catinput = 'this is some text b/c i cant seem to copy and paste any cat ipsum, Steal the warm chair right after you get up ears back wide eyed mewl for food at 4am, or scratch but make plans to dominate world and then take a nap hack up furballs lick plastic bags. With tail in the air get my claw stuck in the dogs ear. Pelt around the house and up and down stairs chasing phantoms when owners are asleep, cry for no apparent reason Scratch me there, elevator butt. Scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. Attempt to leap between urniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? i meant to do that now i shall wash myself intently attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? this is some text b/c i cant seem to copy and paste any cat ipsum, Steal the warm chair right after you get up ears back wide eyed mewl for food at 4am, or scratch but make plans to dominate world and then take a nap hack up furballs lick plastic bags. With tail in the air get my claw stuck in the dogs ear. Pelt around the house and up and down stairs chasing phantoms when owners are asleep, cry for no apparent reason Scratch me there, elevator butt. Scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. Attempt to leap between urniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? i meant to do that now i shall wash myself intently attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? this is some text b/c i cant seem to copy and paste any cat ipsum, Steal the warm chair right after you get up ears back wide eyed mewl for food at 4am, or scratch but make plans to dominate world and then take a nap hack up furballs lick plastic bags. With tail in the air get my claw stuck in the dogs ear. Pelt around the house and up and down stairs chasing phantoms when owners are asleep, cry for no apparent reason Scratch me there, elevator butt. Scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. Attempt to leap between urniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? i meant to do that now i shall wash myself intently attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? this is some text b/c i cant seem to copy and paste any cat ipsum, Steal the warm chair right after you get up ears back wide eyed mewl for food at 4am, or scratch but make plans to dominate world and then take a nap hack up furballs lick plastic bags. With tail in the air get my claw stuck in the dogs ear. Pelt around the house and up and down stairs chasing phantoms when owners are asleep, cry for no apparent reason Scratch me there, elevator butt. Scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. Attempt to leap between urniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? i meant to do that now i shall wash myself intently attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? this is some text b/c i cant seem to copy and paste any cat ipsum, Steal the warm chair right after you get up ears back wide eyed mewl for food at 4am, or scratch but make plans to dominate world and then take a nap hack up furballs lick plastic bags. With tail in the air get my claw stuck in the dogs ear. Pelt around the house and up and down stairs chasing phantoms when owners are asleep, cry for no apparent reason Scratch me there, elevator butt. Scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. Attempt to leap between urniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? i meant to do that now i shall wash myself intently attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? this is some text b/c i cant seem to copy and paste any cat ipsum, Steal the warm chair right after you get up ears back wide eyed mewl for food at 4am, or scratch but make plans to dominate world and then take a nap hack up furballs lick plastic bags. With tail in the air get my claw stuck in the dogs ear. Pelt around the house and up and down stairs chasing phantoms when owners are asleep, cry for no apparent reason Scratch me there, elevator butt. Scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. Attempt to leap between urniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? i meant to do that now i shall wash myself intently attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? this is some text b/c i cant seem to copy and paste any cat ipsum, Steal the warm chair right after you get up ears back wide eyed mewl for food at 4am, or scratch but make plans to dominate world and then take a nap hack up furballs lick plastic bags. With tail in the air get my claw stuck in the dogs ear. Pelt around the house and up and down stairs chasing phantoms when owners are asleep, cry for no apparent reason Scratch me there, elevator butt. Scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. Attempt to leap between urniture but woefully miscalibrate and bellyflop onto the floor; whats your problem? i meant to do that now i shall wash myself intently attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; whats your problem?'
let browser, page, newPage


describe( 'it should be true', async () => {

  it( 'true equals true', async () =>{
    assert.equal(true, true, 'its true')
  })
})


describe( 'Website Open', async () => {

  it( 'Browser Opens Successfully', async () => {
    browser = await puppeteer.launch({headless: false});
    assert.exists(browser, true, 'it opened')
  });

  it( 'Page Open Successfully', async () => {
    page = await browser.newPage();
    assert.exists(page, true)
  });

  it( 'Website Should Load Successfully', async () => {
  await page.goto(site, {waitUntil: 'domcontentloaded'});
}).timeout(0);
  assert.isNotFrozen( true)

  it( 'Website Closes', async () => {
    await browser.close()
  });

});



describe( 'User Login', async () => {

  it( 'Types Email and password', async () => {
    await page.type(['#root > div > div > div.jss1.jss11.jss21.grid > div.jss99.jss102.jss100.jss98.card2 > div > div.App > form > div:nth-child(1) > input'], email_login, { delay: 10 });
    await page.type(['#root > div > div > div.jss1.jss11.jss21.grid > div.jss99.jss102.jss100.jss98.card2 > div > div.App > form > div:nth-child(3) > input'], login_password, { delay: 10})
    await page.click(['#root > div > div > div.jss1.jss11.jss21.grid > div.jss99.jss102.jss100.jss98.card2 > div > div.App > form > button.jss218.jss192.jss194.jss197.formLogin'])
    // await page.click(['#root > div:nth-child(2) > div:nth-child(2) > div > div.ql-container.ql-snow > div.ql-editor.ql-blank'])
    // await page.type(['#root > div:nth-child(2) > div:nth-child(2) > div > div.ql-container.ql-snow > div.ql-editor.ql-blank'], catinput, {delay: 10} )
  })

  // it( 'Opens Popup & Logs In', async () => {
  //   await browser.on('targetcreated', async () => {
  //         const pageList = await browser.pages();
  //         const newPage = await pageList[pageList.length - 1];
  //
  //   await newPage.waitForSelector(`#identifierId`);
  //   await newPage.type(`#identifierId`, email_login, { delay: 10 });
  //   await newPage.click('#identifierNext');
  //   await newPage.waitForSelector(`#password input[type="password"`);
  //   await newPage.waitFor(250)
  //   await newPage.type(`#password input[type="password"]`, login_password, { delay: 10 });
  //   await newPage.click('#passwordNext');
  //   // await page.waitForNavigation({ waitUntil: 'networkidle0' }),
  //
  //   })
  // })
  //
  // it( 'Writes and Submits Text', async () => {
  //   await page.screenshot({path: 'to profile.png'})
  //   // await page.waitForNavigation({ waitUntil: 'networkidle0' })
  //   // await page.type('#filled-full-width', catinput )
  //   // await page.click(['#root > button'])
  //
  // })




})




// (async () => {
//   const browser = await puppeteer.launch({headless: false});
//   const page = await browser.newPage();
//   const email_login = ''
//   const login_password = ''
//   const text_stuff = 'Get my claw stuck in the dogs ear give me attention or face the wrath of my claws or jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water yet claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? purr, i heard this rumor where the humans are our owners, pfft, what do they know?! cough hairball, eat toilet paper. When in doubt, wash plan steps for world domination. Be superior kitty power. Pet me pet me pet me pet me, bite, scratch, why are you petting me hit you unexpectedly and ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss. Be superior attack like a vicious monster. Whos the baby lick plastic bags. Leave dead animals as gifts whos the baby. If it fits, i sits get suspicious of own shadow then go play with toilette paper. Claws in your leg chase imaginary bugs, yet chew foot. Favor packaging over toy sleep nap but eat all the power cords hack chase imaginary bugs thinking longingly about tuna brine. Yowling nonstop the whole night wack the mini furry mouse and purr. Find something else more interesting kitty poochy for cough hairball, eat toilet paper so lick butt, yet sleep on dog bed, force dog to sleep on floor yet lies down . Throwup on your pillow poop in the plant pot eat grass, throw it back up, disappear for four days and return home with an expensive injury; bite the vet so purr or i cry and cry and cry unless you pet me, and then maybe i cry just for fun.'
//
//   await page.goto('https://knowthyself-mtcs.herokuapp.com');
//   await page.click(['#root > div > div > div > div.jss99.jss102.jss100.jss98.signUp > div > div > button']);
//   await page.waitFor(250)
//   await browser.on('targetcreated', async () => {
//     try {
//       const pageList = await browser.pages();
//       const newPage = await pageList[pageList.length - 1];
//
//       await newPage.waitForSelector(`#identifierId`);
//       await newPage.type(`#identifierId`, email_login, { delay: 10 });
//       await newPage.click('#identifierNext');
//       await newPage.waitForSelector(`#password input[type="password"`);
//       await newPage.waitFor(250)
//       await newPage.type(`#password input[type="password"]`, login_password, { delay: 10 });
//       await newPage.click('#passwordNext');
//
//       // Back to main page, write and submit text
//       await page.waitForNavigation({ waitUntil: 'networkidle0' }),
//       await page.type('#filled-full-width', text_stuff )
//       await page.click(['#root > button'])
//
//       // Check that entries page can load
//       await page.click(['#root > div:nth-child(1) > header > div > button'])
//       await page.waitFor(250)
//       await page.click(['#root > div:nth-child(1) > div > div > ul > li:nth-child(2) > button'])
//       await page.waitFor(250)
//
//       // Check habits work
//       await page.click(['#root > div:nth-child(1) > header > div > button'])
//       await page.waitFor(250)
//       await page.click(['#root > div:nth-child(1) > div > div > ul > li:nth-child(3) > button'])
//       await page.waitFor(250)
//
//       // Check todo works
//       await page.click(['#root > div > div:nth-child(1) > header > div > button'])
//       await page.waitFor(250)
//       await page.click(['#root > div > div:nth-child(1) > div > div > ul > li:nth-child(4) > button'])
//       await page.waitFor(250)
//       // await page.screenshot({path: '123.png'})
//
//       console.log('made it to the end')
//     } catch(err) {
//       console.log('error', err)
//     }
//
//       await browser.close();
//   })
// })();
