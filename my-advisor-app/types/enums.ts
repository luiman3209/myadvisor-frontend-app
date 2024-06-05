export enum UserRoleEnum {
    Investor = 'investor',
    Advisor = 'advisor',
    Admin = 'admin'
}

export enum ProfileVisibilityEnum {
    Public = 'public',
    Private = 'private'
}

export enum NetWorthEnum {
    LessThan50000 = '<50000',
    From50000To99999 = '50000-99999',
    From100000To199999 = '100000-199999',
    From200000To499999 = '200000-499999',
    From500000To999999 = '500000-999999',
    From1000000To4999999 = '1000000-4999999',
    From5000000To9999999 = '5000000-9999999',
    From10000000To49999999 = '10000000-49999999',
    From50000000To99999999 = '50000000-99999999',
    From100000000To499999999 = '100000000-499999999',
    From500000000To999999999 = '500000000-999999999',
    MoreThan1000000000 = '>1000000000'
}

export enum IncomeRangeEnum {
    LessThan25000 = '<25000',
    From25000To49999 = '25000-49999',
    From50000To74999 = '50000-74999',
    From75000To99999 = '75000-99999',
    From100000To149999 = '100000-149999',
    From150000To199999 = '150000-199999',
    MoreThan200000 = '>200000'
}

export enum ShiftTimeEnum {
    Time0000 = '0000',
    Time0100 = '0100',
    Time0200 = '0200',
    Time0300 = '0300',
    Time0400 = '0400',
    Time0500 = '0500',
    Time0600 = '0600',
    Time0700 = '0700',
    Time0800 = '0800',
    Time0900 = '0900',
    Time1000 = '1000',
    Time1100 = '1100',
    Time1200 = '1200',
    Time1300 = '1300',
    Time1400 = '1400',
    Time1500 = '1500',
    Time1600 = '1600',
    Time1700 = '1700',
    Time1800 = '1800',
    Time1900 = '1900',
    Time2000 = '2000',
    Time2100 = '2100',
    Time2200 = '2200',
    Time2300 = '2300'
}

export enum VerificationStatusEnum {
    Yes = 'Y',
    No = 'N'
}

export enum AppointmentStatusEnum {
    Scheduled = 'scheduled',
    Confirmed = 'confirmed',
    Completed = 'completed',
    Canceled = 'canceled'
}

export enum PaymentStatusEnum {
    Pending = 'pending',
    Completed = 'completed',
    Failed = 'failed'
}