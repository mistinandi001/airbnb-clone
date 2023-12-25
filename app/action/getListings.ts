import prisma from "@/app/libs/prismadb";

export interface IListingParams{
  userId?:string;
  roomCount?:string;
  bathroomCount?:string;
  guestCount?:string;
  startDate?:string;
  endDate?:string;
  locationValue?:string;
  category?:string
}
export async function getListings(
  params : IListingParams
) {
    try {
      const {
        userId,
        roomCount,
        bathroomCount,
        guestCount,
        startDate,
        endDate,
        locationValue,
        category
      } = params;

      let query :any = {};

      if(userId){
         query.userId = userId;
      }

      if(category){
        query.category=category;
      }

      if(locationValue){
        query.locationValue = locationValue;
      }

      if(roomCount){
        query.roomCount ={
          gte : +roomCount
        }
      }

      if(bathroomCount){
        query.bathroomCount ={
          gte : +bathroomCount
        }
      }

      if(guestCount){
        query.guestCount ={
          gte : +guestCount
        }
      }

      if(startDate && endDate){
        query.NOT = {
          reservations : {
            some :{
              OR:[
                {
                  endDate:{gte:startDate},
                  startDate:{lte:startDate}
                },
                {
                  startDate:{lte:endDate},
                  endDate:{gte:endDate}
                }
              ]
            }
          }
        }
      }

      const listings = await prisma.listing.findMany({
        where:query,
        orderBy:{
            createdAt:'desc'
        } 
      })  

      const safeListings = listings.map((listing)=>({
        ...listing,
        createdAt:listing.createdAt.toISOString()
      }))
      return safeListings;
    } catch (error:any) {
      console.log(error)
       throw new Error(error); 
    }
}