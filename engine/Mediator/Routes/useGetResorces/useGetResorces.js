function useGetResources(resources){
    return (name) => {
        return resources[name]
    }
}