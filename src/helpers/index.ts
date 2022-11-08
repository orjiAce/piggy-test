
import 'intl';
import 'intl/locale-data/jsonp/en';
import {useFocusEffect} from "@react-navigation/native";
import {useCallback, useRef} from "react";




export const numberWithCommas = (number: number | string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const currencyFormatter = (locals: 'en-US' | 'en-NG', currency: 'USD' | 'NGN') => {
    return new Intl.NumberFormat(locals, {
        style: 'currency',
        currency,
minimumFractionDigits:1,
        maximumFractionDigits:2,
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    })
}


export function truncate(str: any, n: number) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}


function getDifference(array1: any[], array2: any[]) {
    return array1.filter(object1 => {
        return array2.some(object2 => {
            return object1.id === object2.id;
        });
    });
}


export const toKobo = (amount: string) => {
    const str = amount.replace(',', '.')
    return str.length < 3 || str[str.length - 3] == '.' ? Number(str.replace('.', '')) : Number(str.replace('.', ''))*100
}

//In the below code, refetch is skipped the first time because useFocusEffect calls our callback on mount in addition to screen focus.
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
    const firstTimeRef = useRef(true)

    useFocusEffect(
        useCallback(() => {
            if (firstTimeRef.current) {
                firstTimeRef.current = false;
                return;
            }

            refetch()
        }, [refetch])
    )
}
