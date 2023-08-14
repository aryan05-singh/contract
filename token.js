const {expect} = require("chai");

describe("Token contract", function () {
              let Token;
              let hardhatToken;
              let owner;
              let addr1;
              let addr2;
              let addrs;

              beforeEach(async function(){
              Token = await ethers.getContractFactory("Token");
             [owner, addr1,addr2,...addrs] =  await ethers.grtSigners();   
              hardhatToken= await Token.deploy();

              });

              describe("Deployment",function(){
             it("Should set the right owner",async function(){
              except(await hardhatToken.owner()).to.equal(owner.address);
             })
             it("Should assign the total supplyof tokens to the owner",async function (){
              const ownerBalance = await hardhatToken.balanceOf(owner.address);
              except(await hardhatToken.totalSupply()).to.equal(ownerBalance);
             });
              });

              describe ("Transactions",function(){
                  it("Should transfer token between accounts",async function(){
                            await hardhatToken.transfer(addr1.address,5);
                            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
                            except(addr1Balance).to.equql(5);
                            await hardhatToken.connect(addr1).transfer(addr2.address,5);
                            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
                            except(addr2Balance).to.equal(5);
                  }) ;
                  it("Should fail if sender does not have enough tokens",async function(){
                  const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
                  await except ( hardhatToken.connect(addr1). transfer (owner.address, 1)).to.be.revertedWith("Not enough tokens");
                  except(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalace);
                  })  ;       
            
              });
});

              
              
              
              
              
              
              
              
              
              
              
              



        