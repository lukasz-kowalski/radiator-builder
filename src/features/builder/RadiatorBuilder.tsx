"use client";

import { Card } from "@/components/layout";
import { RadiatorFamily } from "@/api/dto/radiator";
import RadiatorForm from "@/features/builder/RadiatorForm";
import RadiatorList from "@/features/builder/RadiatorList";
import useRadiatorsState from "@/features/builder/hooks/useRadiatorsState";

interface Props {
  families: RadiatorFamily[];
}

export default function RadiatorBuilder({
  families,
}: Props): React.JSX.Element {
  const {
    radiators,
    totalItems,
    isFetching,
    hasSearched,
    setFilters,
    loadMoreItems,
  } = useRadiatorsState();

  return (
    <Card>
      <RadiatorForm families={families} onSubmit={setFilters} />

      <RadiatorList
        isFetching={isFetching}
        radiators={radiators}
        totalItems={totalItems}
        hasSearched={hasSearched}
        loadMoreItems={loadMoreItems}
      />
    </Card>
  );
}
