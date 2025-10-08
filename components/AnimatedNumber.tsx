'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const AnimatedNumber = ({ value, className }: AnimatedNumberProps) => {
  const { ref, inView } = useInView({
    /**
     * Opcje Intersection Observer:
     * triggerOnce: true -> Animacja uruchomi się tylko raz.
     * threshold: 0.1 -> Uruchom animację, gdy co najmniej 10% elementu jest widoczne.
     */
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <CountUp
          start={0}
          end={value}
          duration={2.5} // Czas trwania animacji w sekundach
          separator=" " // Polski separator tysięcy
          decimals={0}   // Liczba miejsc po przecinku
        />
      ) : (
        // Wyświetl 0, zanim animacja się rozpocznie
        0
      )}
    </div>
  );
};

export default AnimatedNumber;