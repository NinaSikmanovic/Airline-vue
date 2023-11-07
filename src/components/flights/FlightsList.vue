<template>
  <div class="flights-list background">
    <user-dropdown></user-dropdown>
    <app-loader v-if="loading" height="200px"></app-loader>
    <div v-if="error" class="alert alert-danger w-25" role="alert">
      {{ $t('unexpectedError') }}
    </div>
    <div v-else>
      <h3>{{ $t('flightsFor') }} {{ formattedDate }}:</h3>
      <div class="d-flex flex-column">
        <button class="flight-destination"
                v-for="flight in flights"
                :key="flight.id"
                @click="showDetails(flight.id)">
          <font-awesome-icon :icon="faPlane" class="plane-icon"/>
          <span>{{ flight.from }} - {{ flight.to }}</span>
        </button>
        <div v-if="flights && flights.length === 0" class="alert alert-info  w-25" role="alert">
          {{ $t('noData') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {FlightService} from '@/services/FlightsService.js';
import AppLoader from "@/components/shared/AppLoader";
import {faPlane} from '@fortawesome/free-solid-svg-icons';
import UserDropdown from "@/components/shared/UserDropdown";


export default {
  components: {
    AppLoader,
    UserDropdown
  },
  data() {
    return {
      flights: [],
      loading: true,
      error: null,
      faPlane: faPlane,
      date: new Date()
    };
  },
  computed: {
    formattedDate() {
      const options = {day: 'numeric', month: 'numeric', year: 'numeric'};
      return this.date.toLocaleDateString(undefined, options);
    }
  },
  created() {
    this.getFlights();
  },
  methods: {
    async getFlights() {
      try {
        this.loading = true;
        const response = await FlightService.getFlights(this.$i18n.locale);
        this.flights = response.data;
        this.error = null;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    showDetails(id) {
      this.$router.push(`/flights/${id}`);
    }
  }
};
</script>

<style scoped>

.background {
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}


.flights-list {
  display: flex;
  flex-direction: column;
  padding: 40px;
}

.flight-destination {
  border: 1px solid #c6c5c5;
  border-radius: 6px;
  margin-top: 30px;
  padding: 20px;
  background-color: var(--color-primary);
  text-align: center;
  width: 40%;
}

.plane-icon {
  margin-right: 10px;
  font-size: 20px;
}

@media (max-width: 425px) {
  .flight-destination {
    width: 100%;
  }

  .flights-list {
    padding: 14px;
  }
}

@media (min-width: 425px) and (max-width: 768px) {
  .background {
    background-position: 85% center;
  }

  .flight-destination {
    width: 60%;
  }

}


</style>
