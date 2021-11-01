import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/TrendingHandler.requestData';
  
export default class TrendingLWC extends LightningElement {
    @track results;

    @wire(getAccountList)
        accounts({ error, data }) {
            if(data) {
                let values = JSON.parse(data);
                let percent = parseInt(values.default.timelineData[values.default.timelineData.length-1].formattedValue[0], 10);
                let radians = (((percent >= 50 ? (percent-50)*2 : percent*2)/100 * 180) - (percent >= 50 ? - 90 : 90)) * (Math.PI / 180);
                
                this.results = {
                    value: percent,
                    keyword: "Serial Killers",
                    svg: `M115,115 L115,5 A110,110 1 0,1 ${percent >= 50 ? '115,225 A110,110 1 0,1' : ''} 
                          ${115 + 110 * (percent >= 50 ? Math.cos(radians): Math.sin(radians))}, 
                          ${115 + 110 * (percent >= 50 ? Math.sin(radians): Math.cos(radians))} z`,
                }
            }
            this.error = error;
        }
}