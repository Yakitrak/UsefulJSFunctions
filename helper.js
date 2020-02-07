export default {
    findEndpoint: (ref, endpoints) => {
        let endRef = ref !== undefined ? ref.replace("@", "") : "";
        let endpoint = endpoints[endRef];
        return endpoint
    },

    generateURL: (endpoint, column, values) => {
        let url = "default_url";
        if (endpoint.url.includes("$")) {
            url = endpoint.url.replace(":$APPSELECT", values[column.listcontent.parameters.url[0]]);
        } 
        else {
            let allKeys = Object.keys(values);
            let firstKey = allKeys[0];
            let firstValue = values[firstKey];
            url = endpoint.url.replace(":" + endpoint.parameters.url[0], firstValue)
        }
        return url;
    },

    getFirstValue: (obj) => {
        let allKeys = Object.keys(obj);
        let firstKey = allKeys[0];
        let firstValue = obj[firstKey];
        return firstValue;
    },
    sortData: (data, colIndex, order) => {
        return data.sort((a, b) => {
            let comparison = 0;
            let key = Object.keys(a.data)[colIndex];
            // if strings - sort alphabetically
            if (isNaN(a.data[key]) && isNaN(b.data[key])) {
                const dataA = a.data[key].toUpperCase();
                const dataB = b.data[key].toUpperCase();
                if (dataA > dataB) {
                    comparison = 1;
                } else if (dataA < dataB) {
                    comparison = -1;
                }
            }
            // if numbers - sort numerically
            else {
                const dataA = parseInt(a.data[key]);
                const dataB = parseInt(b.data[key]);
                comparison = dataA - dataB;
            }
            // return based on order direction
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        });
    },

    findObjectInArray: (array, key, id) => {
        let value = {};
        for (let x of array) {
            if (x[key] === id) {
                value = x;
            }
        }
        return value
    },
}
