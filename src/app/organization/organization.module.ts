import {NgModule} from '@angular/core';
import {CharityEventsListComponent} from './charity-events-list/charity-events-list.component';
import {RouterModule} from '@angular/router';
import {OrganizationRoutes} from './organization-routing.module';
import {OrganizationDetailsComponent} from './organization-details/organization-details.component';
import {AddCharityEventComponent} from './add-charity-event/add-charity-event.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {OrganizationContractService} from './organization-contract.service';
import {CharityEventContractService} from './charity-event-contract.service';
import {IncomingDonationContractService} from './incoming-donation-contract.service';
// tslint:disable-next-line:max-line-length
import {IncomingDonationsListComponent} from './incoming-donations-list/incoming-donations-list.component';
// tslint:disable-next-line:max-line-length
import {AddIncomingDonationComponent} from './add-incoming-donation/add-incoming-donation.component';
import {NgSelectizeModule} from 'ng-selectize';
import {OrganizationsListComponent} from './organizations-list/organizations-list.component';
import {IsOrganizationAddressGuard} from './is-organization-address.guard';
import {TagsBitmaskService} from './tags-bitmask.service';
import {SetBitmaskTagsComponent} from './set-bitmask-tags/set-bitmask-tags.component';
import {BitmaskTagsListComponent} from './bitmask-tags-list/bitmask-tags-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {IncomingDonationSendFundsModalComponent} from './incoming-donation-send-funds-modal/incoming-donation-send-funds-modal.component';

@NgModule({
	declarations: [
		OrganizationDetailsComponent,
		CharityEventsListComponent,
		AddCharityEventComponent,
		IncomingDonationsListComponent,
		AddIncomingDonationComponent,
		OrganizationsListComponent,
		SetBitmaskTagsComponent,
		BitmaskTagsListComponent,
		IncomingDonationSendFundsModalComponent
	],
  	entryComponents: [IncomingDonationSendFundsModalComponent],
	imports: [
		FormsModule,
		CommonModule,
		RouterModule.forChild(OrganizationRoutes),
		ReactiveFormsModule,
		NgSelectizeModule,
		NgbModule
	],
	providers: [
		OrganizationContractService,
		CharityEventContractService,
		IncomingDonationContractService,
		IsOrganizationAddressGuard,
		TagsBitmaskService,
		IsOrganizationAddressGuard,
	]
})

export class OrganizationModule {
}
