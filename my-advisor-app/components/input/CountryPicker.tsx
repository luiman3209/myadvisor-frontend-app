"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { QualificationEntity } from "@/types/entity/qualification_entity"
import { CirclePlus, Trash } from "lucide-react"


const usStates: { [key: string]: string } = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY"
};


type CountryPickerProps = {

    countryCode: string;
    setCountryCode: (value: string) => void;

}

export function CountryPicker({ countryCode, setCountryCode }: CountryPickerProps) {
    const [open, setOpen] = React.useState(false)
    const [countries, setCountries] = React.useState<{ [key: string]: string }>(usStates)
    const isDesktop = window.innerWidth > 768

    const handleSelectCountry = (country: string) => {
        console.log(country);
        setCountryCode(country);
        setOpen(false)
    }

    if (isDesktop) {
        return (
            <>  <div className="flex items-center space-x-2">


                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[150px] justify-start space-x-2">
                            <span>{countryCode ? countryCode : 'State/Province'}</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                        <CountriesList
                            countries={countries}
                            setOpen={setOpen}
                            handleSelectCountry={handleSelectCountry}
                        />
                    </PopoverContent>
                </Popover>
            </div>


            </>
        )
    }

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start space-x-2">
                        <span>State/Province</span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <CountriesList
                            countries={countries}
                            setOpen={setOpen}
                            handleSelectCountry={handleSelectCountry}
                        />
                    </div>
                </DrawerContent>
            </Drawer>


        </>
    )
}

function CountriesList({
    countries,
    setOpen,
    handleSelectCountry,
}: {
    countries: { [key: string]: string }
    setOpen: (open: boolean) => void
    handleSelectCountry: (county: string) => void
}) {
    return (
        <Command>
            <CommandInput placeholder="Filter qualifications..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>

                    {countries && Object.keys(countries).map((country) => (
                        <CommandItem key={country} onSelect={() => handleSelectCountry(countries[country])}>
                            {country}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
