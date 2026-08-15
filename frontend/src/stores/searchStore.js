import {create} from 'zustand'

export const useSearchStore = create(set=>({
    searchQuery : '' , 
    searchQueryUpdater:(str)=>set({
        searchQuery:str
    })
}))