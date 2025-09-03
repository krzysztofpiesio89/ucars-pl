'use client';

import Image from "next/image";
import CustomButton from "./CustomButton";
import { CardCardProps } from "@/types";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { addToFavorites, removeFromFavorites, isCarFavorite } from '@/utils/index';

const CarCard = ({
  car,
  isFavorite = false,
  handleDelete,
  handleEdit,
}: CardCardProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  const [isFavoriteBtnActive, setIsFavoriteBtnActive] = useState(isFavorite);
  const [isLoading, setIsLoading] = useState(false);

  // Sprawdź stan ulubionego przy ładowaniu
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (session?.user?.id && car.id) {
        const userId = parseInt(session.user.id);
        try {
          const isFavorite = await isCarFavorite(userId, car.id);
          setIsFavoriteBtnActive(isFavorite);
        } catch (error) {
          console.error('Check favorite status error:', error);
        }
      }
    };
    
    checkFavoriteStatus();
  }, [session?.user?.id, car.id]);

  const handleHeartClick = async (carId: number) => {
    if (!session?.user?.id) {
      toast("Login/sign in to add to favorite 💖");
      return;
    }

    const userId = parseInt(session.user.id);
    setIsLoading(true);

    try {
      if (isFavoriteBtnActive) {
        // Usuń z ulubionych
        const result = await removeFromFavorites(userId, carId);
        if (result.success) {
          toast.success("Removed from favorites ❤️");
          setIsFavoriteBtnActive(false);
        } else {
          toast.error("Failed to remove from favorites");
        }
      } else {
        // Dodaj do ulubionych
        const result = await addToFavorites(userId, carId);
        if (result.success) {
          toast.success("Added to favorites 💖");
          setIsFavoriteBtnActive(true);
        } else {
          toast.error(result.message || "Failed to add to favorites");
        }
      }
    } catch (error) {
      console.error('Heart click error:', error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Obsługa imageFiles: tylko lokalne ścieżki lub fallback
  const getImages = (): string[] => {
    if (Array.isArray(car.imageFiles)) {
      return car.imageFiles.filter((img) => typeof img === 'string' && img.startsWith("/"));
    }
    
    if (typeof car.imageFiles === "string") {
      try {
        const parsed = JSON.parse(car.imageFiles);
        return Array.isArray(parsed) 
          ? parsed.filter((img: string) => typeof img === 'string' && img.startsWith("/"))
          : [];
      } catch {
        return [];
      }
    }
    
    return [];
  };

  const images = getImages();
  const displayImage = images[0] || "/cars/fallback.webp";

  return (
    <div className="w-full h-fit max-w-lg mx-auto bg-white dark:bg-gradient-radial from-slate-700 to-slate-900 dark:border-slate-700/70 md:hover:shadow-lg transition-all duration-150 ease-linear p-3 md:p-4 rounded-2xl border group group-hover:scale-125">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-bold capitalize truncate max-w-[75%]">
          {car.carTitle || `${car.make} ${car.model}`}
        </h1>
        <button 
          type="button" 
          onClick={() => handleHeartClick(car.id)}
          disabled={isLoading}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Image
            src={`/icons/${isFavoriteBtnActive ? "heart-filled" : "heart-outline"}.svg`}
            alt="favorite button"
            width={20}
            height={20}
            className={`object-contain cursor-pointer ${
              isFavoriteBtnActive ? "scale-150 transition-transform duration-150 ease-in" : ""
            } ${isLoading ? "opacity-50" : ""}`}
          />
        </button>
      </div>

      <p className="text-gray-400 capitalize mt-1">{car.typeOfclass || car.bodyStyle || "N/A"}</p>

      <div className="relative w-full h-48 rounded-lg mt-1">
        <Image
          src={displayImage}
          alt="car"
          fill
          className="object-contain absolute w-full rounded-lg"
        />
      </div>

      <div className="w-full mt-2 p-2 h-fit">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <Image
              src={"/icons/steering-wheel.svg"}
              alt="steering wheel"
              width={15}
              height={15}
              className="object-contain"
            />
            <span className="text-gray-400 text-sm">{car.transmission || "Manual"}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Image
              src={"/icons/fuel-tank.svg"}
              alt="fuel-tank"
              width={15}
              height={15}
              className="object-contain"
            />
            <span className="text-gray-400 text-sm">{car.fuelType || "N/A"}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Image
              src={"/icons/people.svg"}
              alt="people"
              width={15}
              height={15}
              className="object-contain"
            />
            <span className="text-gray-400 text-sm">{car.cylinders || 0} Cyl</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="relative">
            <span className="absolute top-0 text-xs font-bold">$</span>
            <span className="text-lg md:text-2xl font-bold text-center ml-2">
              {(car.rentPrice || car.buyItNowPrice || car.currentBid || 0).toFixed(2)}
            </span>
            <span className="absolute bottom-0 text-xs font-bold">/bid</span>
          </div>
          <Link href={`/cars/${car.id}`}>
            <CustomButton
              title="More Info"
              type="button"
              containerStyle="bg-blue-600 text-white w-full px-5 rounded-full dark:bg-slate-700 dark:text-slate-300"
            />
          </Link>
        </div>

        { console.log(car.id)};
            {car.creator?.email === session?.user?.email && pathname === "/profile" && (
          <div className="mt-4 flex items-center justify-between gap-2">
            <CustomButton
              title="Edit"
              type="button"
              handleClick={() => handleEdit && handleEdit(car.id)} // używamy car.id zamiast car._id
              containerStyle="bg-green-600 text-white w-full px-5 rounded-full dark:bg-blue-500 dark:text-slate-300"
            />
            <CustomButton
              title="Delete"
              type="button"
              handleClick={() => handleDelete && handleDelete(car.id)} // używamy car.id zamiast car._id
              containerStyle="border border-red-500 w-full px-5 rounded-full dark:bg-red-500 dark:text-slate-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;