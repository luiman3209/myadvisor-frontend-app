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
import { Card } from "../ui/card"

type QualificationPickerProps = {
    qualifications: QualificationEntity[];
    selectedQualifications: QualificationEntity[];
    setSelectedQualifications: (value: QualificationEntity[]) => void;
}

export function QualificationPicker({ qualifications, selectedQualifications, setSelectedQualifications }: QualificationPickerProps) {
    const [open, setOpen] = React.useState(false)
    const [availableQualifications, setAvailableQualifications] = React.useState(qualifications.map((q) => q))
    const isDesktop = window.innerWidth > 768

    const handleSelectQualification = (qualification: QualificationEntity) => {
        setSelectedQualifications([...selectedQualifications, qualification]);
        setAvailableQualifications(availableQualifications.filter((q) => q.qualification_id !== qualification.qualification_id));
        setOpen(false)
    }

    const removeQualification = (qualificationId: number) => {
        setSelectedQualifications(selectedQualifications.filter((q) => q.qualification_id !== qualificationId)
        );
        setAvailableQualifications([...availableQualifications, ...qualifications.filter((q) => q.qualification_id === qualificationId)]);
    }

    if (isDesktop) {
        return (
            <>  <div className="flex items-center space-x-2">

                <div className="flex space-x-2">
                    {selectedQualifications.map((qualification) => (
                        <Card key={qualification.qualification_id} className="flex items-center space-x-2 p-2">
                            <span className="">{qualification.qualification_name}</span>
                            <Button className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white" size="icon" onClick={() => removeQualification(qualification.qualification_id)}>
                                <Trash className=" w-4 h-4" />
                            </Button>

                        </Card>
                    ))}
                </div>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[150px] justify-start space-x-2">
                            <CirclePlus className="text-black" /> <span>Add Qualification</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                        <QualificationList
                            qualifications={availableQualifications}
                            setOpen={setOpen}
                            handleSelectQualification={handleSelectQualification}
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
                        <CirclePlus /> <span>Add Qualification</span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <QualificationList
                            qualifications={availableQualifications}
                            setOpen={setOpen}
                            handleSelectQualification={handleSelectQualification}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
            <div className="flex space-x-2 space-y-2">
                {selectedQualifications.map((qualification) => (
                    <div key={qualification.qualification_id} className="flex items-center space-x-2">
                        <span>{qualification.qualification_name}</span>
                        <Button className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white " size="icon" onClick={() => removeQualification(qualification.qualification_id)}>
                            <Trash className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>

        </>
    )
}

function QualificationList({
    qualifications,
    setOpen,
    handleSelectQualification,
}: {
    qualifications: QualificationEntity[]
    setOpen: (open: boolean) => void
    handleSelectQualification: (qualification: QualificationEntity) => void
}) {
    return (
        <Command>
            <CommandInput placeholder="Filter qualifications..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {qualifications.map((qualification) => (
                        <CommandItem
                            key={qualification.qualification_id}
                            value={qualification.qualification_name}
                            onSelect={(value) => {
                                const selected = qualifications.find((q) => q.qualification_name === value)
                                if (selected) {
                                    handleSelectQualification(selected)
                                }
                                setOpen(false)
                            }}
                        >
                            {qualification.qualification_name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
