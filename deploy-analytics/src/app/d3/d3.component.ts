import { Component } from '@angular/core'
import { DataService } from './data.service'

@Component({
    templateUrl: './d3.component.html',
    styleUrls: ['./d3.styles.css']
})

export class D3Component {
    data: any
    constructor (private dataserv: DataService) {

    }

    ngOnInit() {
        this.data = this.dataserv.getData()
    }
}