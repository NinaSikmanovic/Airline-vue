<template>
  <div class="flight-info">
    <user-dropdown></user-dropdown>
    <app-loader v-if="loading" height="200px"></app-loader>
    <div v-if="error" class="alert alert-danger w-25" role="alert">
      {{ $t('unexpectedError') }}
    </div>
    <div v-else
         class="d-flex align-items-center flex-column-small">
      <div class="p-2">
        <div class="p-2 fw-bold">{{ flight.from }} - {{ flight.to }}</div>
        <div class="p-2" v-if="flight.plane && flight.plane.name"><span
            class="fw-bold">{{ $t('plane') }} </span>{{ flight.plane.name }}
        </div>
        <div class="p-2"><span class="fw-bold">{{ $t('flightNumber') }}</span> {{ flight.flightNumber }}</div>
      </div>
      <div v-if="flight.plane && flight.plane.imageUrl">
        <img :src="require(`@/assets/images/${flight.plane.imageUrl}`)" class="plane-img">
      </div>
      <div class="p-2" v-if="user && user.role !== 'rola2'">
        <div v-for="crew in flight.crews" :key="crew.id">
          <div class="p-2">
            <font-awesome-icon :icon="faUser"/>
            <span class="fw-bold"> {{ crew.role }}:</span>
            {{ crew.name }} {{ crew.surname }}
          </div>
        </div>
      </div>
    </div>
    <div class="py-4"> {{ $t('passengers') }}</div>
    <table class="table passengers-table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th class="p-2" scope="col">{{ $t('name') }}</th>
        <th class="p-2" scope="col">{{ $t('surname') }}</th>
        <th class="p-2" scope="col">{{ $t('numberSeat') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(passenger, index) in flight.passengers" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td class="p-2">{{ passenger.name }}</td>
        <td class="p-2">{{ passenger.surname }}</td>
        <td class="p-2"> {{ passenger.seatNumber }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import {FlightService} from '@/services/FlightsService.js';
import AppLoader from "@/components/shared/AppLoader";
import {faUser} from '@fortawesome/free-solid-svg-icons';
import UserDropdown from "@/components/shared/UserDropdown";
import {mapState} from 'vuex';


export default {
  components: {
    AppLoader,
    UserDropdown
  },
  data() {
    return {
      flight: {},
      loading: true,
      error: null,
      flightId: '',
      faUser: faUser
    };
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    const flightId = this.$route.params.id;
    if (flightId) {
      this.getFlightById(flightId);
    }
  },
  methods: {
    async getFlightById(id) {
      try {
        this.loading = true;
        const response = await FlightService.getFlightById(id, this.$i18n.locale);
        this.flight = response.data;
        this.error = null;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


<style scoped>

.flight-info {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-primary);
}

.plane-img {
  width: 400px;
  max-height: 300px;
}

.passengers-table {
  width: 60%;
  --bs-table-bg: unset;
}

@media (max-width: 768px) {
  .flex-column-small {
    flex-direction: column;
  }

  .passengers-table {
    width: 70%;
  }
}

@media (max-width: 425px) {
  .plane-img {
    width: 300px;
  }

  .passengers-table {
    width: 100%;
  }

  .flight-info {
    padding: 14px;
  }
}

@media (min-width: 425px) and (max-width: 992px) {
  .passengers-table {
    width: 90%;
  }
}
</style>
