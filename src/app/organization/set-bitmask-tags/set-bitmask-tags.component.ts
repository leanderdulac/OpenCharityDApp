import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TagsBitmaskService} from '../tags-bitmask.service';

@Component({
	selector: 'opc-set-bitmask-tags',
	templateUrl: 'set-bitmask-tags.component.html',
	styleUrls: ['set-bitmask-tags.component.scss']
})
export class SetBitmaskTagsComponent implements OnInit {
	@Input() bitmask: number;
	@Output() bitmaskChanged: EventEmitter<number> = new EventEmitter<number>();

	readonly tags = this.tagsBitmaskService.tags;

	constructor(private tagsBitmaskService: TagsBitmaskService) {

	}

	ngOnInit() {

	}

	public toggleTag(tagValue: number): void {
		this.bitmask = this.tagsBitmaskService.toggleTag(this.bitmask, tagValue);
		this.bitmaskChanged.emit(this.bitmask);
	}

	public isSelectedTag(tagValue: number): boolean {
		return this.tagsBitmaskService.isSelectedTag(this.bitmask, tagValue);
	}

}
