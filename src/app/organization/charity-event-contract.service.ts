import {Injectable} from '@angular/core';
import {Contract, Tx} from 'web3/types';
import {Web3ProviderService} from '../core/web3-provider.service';
import {merge} from 'lodash';
import Web3 from 'web3';
import {CharityEventContractAbi} from '../contracts-abi';

export interface CharityEvent {
	name: string;
	address: string;
	raised?: string;
	target: string;
	payed: string;
	tags: string;
}


@Injectable()
export class CharityEventContractService {

	private charityEventContract: Contract;
	private web3: Web3;
	private defaultTx: Tx;

	constructor(private web3ProviderService: Web3ProviderService,) {
		this.charityEventContract = this.buildCharityEventContract();
		this.web3 = this.web3ProviderService.web3;
		this.init();
	}

	async init(): Promise<void> {
		const accounts: string[] = await this.web3.eth.getAccounts();
		this.defaultTx = {
			from: accounts[0]
		};
	}

	public getName(address: string, txOptions?: Tx): Promise<string> {
		const contract: Contract = this.cloneContract(this.charityEventContract, address);
		return contract.methods.name().call(txOptions);
	}

	public getTarget(address: string, txOptions?: Tx): Promise<string> {
		const contract: Contract = this.cloneContract(this.charityEventContract, address);
		return contract.methods.target().call(txOptions);
	}


	public getPayed(address: string, txOptions?: Tx): Promise<string> {
		const contract: Contract = this.cloneContract(this.charityEventContract, address);
		return contract.methods.payed().call(txOptions);
	}

	public getTags(address: string, txOptions?: Tx): Promise<string> {
		const contract: Contract = this.cloneContract(this.charityEventContract, address);
		return contract.methods.tags().call(txOptions);
	}

	public async getCharityEventDetails(address: string, txOptions?: Tx): Promise<CharityEvent> {
		return {
			name: await this.getName(address, txOptions),
			address: address,
			target: await this.getTarget(address, txOptions),
			payed: await this.getPayed(address, txOptions),
			tags: await this.getTags(address, txOptions)
		};
	}

	public async getCharityEventsList(charityEventsAddresses: string[], txOptions?: Tx): Promise<CharityEvent[]> {
		const charityEvents = [];

		// for-of is required to provide
		// sequential performing for async/await operations
		for (const address of charityEventsAddresses) {
			const charityEvent: CharityEvent = await this.getCharityEventDetails(address);
			charityEvents.push(charityEvent);
		}

		return charityEvents;
	}


	private cloneContract(original: Contract, address: string): Contract {
		const contract: any = (<any>original).clone();
		const originalProvider = (<any>original).currentProvider;
		contract.setProvider(contract.givenProvider || originalProvider);
		contract.options.address = address;

		return <Contract> contract;
	}

	private buildCharityEventContract(): Contract {
		return new this.web3ProviderService.web3.eth.Contract(CharityEventContractAbi);
	}

}
