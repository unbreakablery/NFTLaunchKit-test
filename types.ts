export interface ICollection {
  amount: string
  block_number_minted: string
  contract_type: string | undefined
  last_metadata_sync: string
  last_token_uri_sync: string | undefined
  metadata: string
  name: string
  symbol: string
  token_address: string
  token_hash: string
  token_id: string
  token_uri: string
  updated_at: string
  block_number?: string
  owner_of?: string
  transfer_index?: number[]
}
export interface ICollectionMetadata {
  image: string
  name: string
  attributes: string[]
  description: string
}

