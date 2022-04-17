# artenc
The Encyclopedia of writers' articles 

<p align="center">
  <img src="https://github.com/ebdurrehm/artenc/blob/main/ARTENC.png">
</p>



## About project and its business model
#### This project is a kind of paid encyclopedia. Anyone can add their article to this contract by paying a minimum of 1 NEAR. If each author adds at least 5 articles to the contract and the article is used by the contract users, 3 NEARs are sent to that author from the account of the contract. As a result, both the authors and the contractor benefit.

___

## Usage

To use this project for development purpose you should follow these following instructions:

1. Clone this repo locally
2. run `yarn` to install all the dependencies
3. run `./scripts/deployDev.sh`

To use this project for production purpose you should follow these following instructions:

it would better that you deploy this contract to the subaccount of your mainnet account

1. clone this repo locally
2. run `./scripts/deployProd.sh` to rebuild, deploy and initialize the contract to a target account

requires the following environment variables

`NEAR_ENV`: Either testnet or mainnet
`OWNER`: The owner of the contract and the parent account. The contract will be deployed to artenc.$OWNER

3. run ./scripts/removeAccount.sh to delete the account

requires the following environment variables

`NEAR_ENV`: Either testnet or mainnet
`OWNER`: The owner of the contract and the parent account. The contract will be deployed to thanks.$OWNER

## Methods and its explanations

| Name   |      functionality      |  privilege | type of function|
|----------|:-------------:|------:|------:|
| add | creates a new article based on the information added by the sender and adds it to the storage  | public | call|
| getArticleSize |    returns the number of articles currently in storage   |   public | view|
| getBalance | returns how much NEARs are currently on the contract balance |    public | view|
| getArticles | returns general information about the articles currently in the storage of the contract, ie in the form of an array of the title of each article and the author |    public | view|
| useArticle | returns the author's article or articles according to the name of the author included. The returned information also contains the url of the article. It also gives the author points because the article has been reviewed by users. |    public | call |
| sendNearToWriter | By using this method, all authors who have included at least 5 articles in the contract and whose article has been used are awarded 2 NEARs. |    private /calling by useArticle method | call |
| deleteArticle | the name of the author to whom the contract holder wishes; delete his article using this method |   owner | call |
