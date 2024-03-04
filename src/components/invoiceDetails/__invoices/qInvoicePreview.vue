prevFac(id) {
      const currectFacture = this.factureList.filter(item => item.id === id)

      localStorage.setItem('facture', JSON.stringify(currectFacture[0]))
      this.$router.push('/facture/view')
    },