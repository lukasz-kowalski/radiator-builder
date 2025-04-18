import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useRadiatorsState from "@/features/builder/hooks/useRadiatorsState";
import { getRadiators } from "@/api/getRadiators";

jest.mock("@/api/getRadiators");

const mockRadiator = {
  id: "1",
  radiator_name: "Emmeline",
  cost_from: 100,
  radiator_length: 200,
};

(getRadiators as jest.Mock).mockResolvedValue({
  data: [mockRadiator],
  currentPage: 1,
  totalPages: 1,
  totalItems: 1,
});

const createWrapper = () => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
};

describe("useRadiatorsState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return initial state", () => {
    const { result } = renderHook(() => useRadiatorsState(), {
      wrapper: createWrapper(),
    });

    expect(result.current.radiators).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.hasSearched).toBe(false);
  });

  it("should fetch radiators after setting filters", async () => {
    const { result } = renderHook(() => useRadiatorsState(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setFilters({
        radiatorFamily: "Emmeline",
        radiatorLengthFrom: 100,
        radiatorLengthTo: 1000,
      });
    });

    await waitFor(() => {
      expect(result.current.radiators).toHaveLength(1);
      expect(result.current.totalItems).toBe(1);
    });

    expect(getRadiators).toHaveBeenCalled();
  });

  it("should support infinite loading via loadMoreItems", async () => {
    const mockPages: Record<
      string,
      {
        data: {
          id: string;
          radiator_name: string;
          cost_from: number;
          radiator_length: number;
        }[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
      }
    > = {
      "1": {
        data: [
          {
            id: "1",
            radiator_name: "Radiator A",
            cost_from: 100,
            radiator_length: 300,
          },
        ],
        currentPage: 1,
        totalPages: 2,
        totalItems: 2,
      },
      "2": {
        data: [
          {
            id: "2",
            radiator_name: "Radiator B",
            cost_from: 200,
            radiator_length: 200,
          },
        ],
        currentPage: 2,
        totalPages: 2,
        totalItems: 2,
      },
    };

    (getRadiators as jest.Mock).mockImplementation(
      (params: URLSearchParams) => {
        const page = params.get("page") || "1";
        return Promise.resolve(mockPages[page]);
      }
    );

    const { result } = renderHook(() => useRadiatorsState(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setFilters({
        radiatorFamily: "Emmeline",
        radiatorLengthFrom: 100,
        radiatorLengthTo: 1000,
      });
    });

    await waitFor(() => expect(result.current.radiators).toHaveLength(1));

    expect(result.current.radiators[0].radiator_name).toBe("Radiator A");

    await act(async () => {
      result.current.loadMoreItems();
    });

    await waitFor(() => expect(result.current.radiators).toHaveLength(2));

    expect(result.current.radiators[1].radiator_name).toBe("Radiator B");
    expect(result.current.totalItems).toBe(2);
  });
});
