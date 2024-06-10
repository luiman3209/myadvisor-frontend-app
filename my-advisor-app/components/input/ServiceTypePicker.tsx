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

import { CirclePlus, Trash } from "lucide-react"
import { Card } from "../ui/card"
import { ServiceType } from "@/types/entity/service_type_entity"

type ServiceTypePickerProps = {
    serviceTypes: ServiceType[];
    selectedServiceTypes: ServiceType[];
    setSelectedServiceTypes: (value: ServiceType[]) => void;
}

export function ServiceTypePicker({ serviceTypes, selectedServiceTypes, setSelectedServiceTypes }: ServiceTypePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [availableServiceTypes, setAvailableServiceTypes] = React.useState(serviceTypes.map((q) => q).filter((q) => !selectedServiceTypes.includes(q)))
    const isDesktop = window.innerWidth > 768

    const handleSelectServiceType = (serviceType: ServiceType) => {
        setSelectedServiceTypes([...selectedServiceTypes, serviceType]);
        setAvailableServiceTypes(availableServiceTypes.filter((q) => q.service_id !== serviceType.service_id));
        setOpen(false)
    }

    const removeServiceType = (serviceTypeId: number) => {
        setSelectedServiceTypes(selectedServiceTypes.filter((q) => q.service_id !== serviceTypeId)
        );
        setAvailableServiceTypes([...availableServiceTypes, ...serviceTypes.filter((q) => q.service_id === serviceTypeId)]);
    }

    if (isDesktop) {
        return (
            <>  <div className="flex items-center space-x-2">

                <div className="flex space-x-2">
                    {selectedServiceTypes.map((serviceType) => (
                        <Card key={serviceType.service_id} className="flex items-center space-x-2 pl-2.5 text-sm font-medium">
                            <span className="">{serviceType.service_type_name}</span>
                            <Button className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white" size="icon" onClick={() => removeServiceType(serviceType.service_id)}>
                                <Trash className=" w-4 h-4" />
                            </Button>

                        </Card>
                    ))}
                </div>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className=" justify-start space-x-2">
                            <CirclePlus className="text-black w-4 h-4" /> <span>Add Expertise</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                        <ServiceTypeList
                            serviceTypes={availableServiceTypes}
                            setOpen={setOpen}
                            handleSelectServiceType={handleSelectServiceType}
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
                        <CirclePlus /> <span>Add Expertise</span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <ServiceTypeList
                            serviceTypes={availableServiceTypes}
                            setOpen={setOpen}
                            handleSelectServiceType={handleSelectServiceType}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
            <div className="flex space-x-2 space-y-2">
                {selectedServiceTypes.map((serviceType) => (
                    <div key={serviceType.service_id} className="flex items-center space-x-2">
                        <span>{serviceType.service_type_name}</span>
                        <Button className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white " size="icon" onClick={() => removeServiceType(serviceType.service_id)}>
                            <Trash className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>

        </>
    )
}

function ServiceTypeList({
    serviceTypes,
    setOpen,
    handleSelectServiceType,
}: {
    serviceTypes: ServiceType[]
    setOpen: (open: boolean) => void
    handleSelectServiceType: (serviceType: ServiceType) => void
}) {
    return (
        <Command>
            <CommandInput placeholder="Filter expertise..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {serviceTypes.map((serviceType) => (
                        <CommandItem
                            key={serviceType.service_id}
                            value={serviceType.service_type_name}
                            onSelect={(value) => {
                                const selected = serviceTypes.find((q) => q.service_type_name === value)
                                if (selected) {
                                    handleSelectServiceType(selected)
                                }
                                setOpen(false)
                            }}
                        >
                            {serviceType.service_type_name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
