import axios from "axios"

export interface BaseItem {
    name: string,
    data: any
}

const staticData: BaseItem = {
    name: "static",
    data: null
}

console.log("service");

export const get = async (): Promise<BaseItem> => {
    if(staticData.data == null) {
        await axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => {
            staticData.name = "done"
            staticData.data = response.data
        })
    }

  return staticData;
};