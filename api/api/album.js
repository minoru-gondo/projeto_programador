var mongoose = require('mongoose');

module.exports = function(app) {

  var api = {};

  var modelAlbum = mongoose.model('Album');
  var modelList1 = mongoose.model('List1');
  var modelList2 = mongoose.model('List2');


	api.listar = (req, res) => {
    console.log('Listando os álbuns...');
    modelAlbum.find().limit(15).then((albums) => {
      res.json(albums);
    }, (error) => {
      console.log(error);
      res.status(500).json(error);
    });
  };

	api.listarPorPaginaFiltro = async (req, res) => {
    console.log('Listando os álbuns por página e filtro...');
    let _pageId = req.params._pageId;
    let term = req.params.term ? new RegExp(req.params.term, "i") : null;
    let skip = 15 * (_pageId - 1);
    let filter = !term ? {} : { $or: [{nome: term}, {username: term}]};

    let totalInList1 = await modelList1.collection.countDocuments({});
    let totalInList2 = await modelList2.collection.countDocuments({});

    let diffList1 = totalInList1 - skip;
    if(diffList1 < 0) {
      let diffList2 = totalInList2 + diffList1;
      if(diffList2 < 0) {
        let albums = await modelAlbum.find(filter).skip(Math.abs(diffList2)).limit(15);
        let total = await modelAlbum.collection.countDocuments(filter);
        res.json({albums, total});
      }
      else {
        let list2 = await modelList2.find(filter).skip(Math.abs(diffList1)).limit(15);
      
        let arrayIdsFromList2 = list2.map((u) => { return u._id; });
      
        let albumsInList2 = await modelAlbum.find({ _id: { $in: arrayIdsFromList2 } });
  
        let albumIdsInList2 = albumsInList2.map((u) => { return u._id; });
  
        let albumsOffLists = await modelAlbum.find({
          $and: [
            filter,
            { _id: { $nin: albumIdsInList2 } },
          ]
        }).limit(15);

        let albums = albumsInList2.concat(albumsOffLists);
        let total = await modelAlbum.collection.countDocuments(filter);
        res.json({albums: albums.slice(0, 15), total});
      }
    }
    else {
      let list1 = await modelList1.find(filter).skip(skip).limit(15);
      let list2 = await modelList2.find(filter).limit(15);
    
      let arrayIdsFromList1 = list1.map((u) => { return u._id; });
      let arrayIdsFromList2 = list2.map((u) => { return u._id; });
    
      let albumsInList1 = await modelAlbum.find({ _id: { $in: arrayIdsFromList1 } });
      let albumsInList2 = await modelAlbum.find({ _id: { $in: arrayIdsFromList2 } });

      let albumIdsInList1 = albumsInList1.map((u) => { return u._id; });
      let albumIdsInList2 = albumsInList2.map((u) => { return u._id; });

      let albumsOffLists = await modelAlbum.find({
        $and: [
          filter,
          { _id: { $nin: albumIdsInList1 } },
          { _id: { $nin: albumIdsInList2 } },
        ]
      }).limit(15);

      let albums = albumsInList1.concat(albumsInList2, albumsOffLists);
      let total = await modelAlbum.collection.countDocuments(filter);
      res.json({albums: albums.slice(0, 15), total});
    }
  };

  // ****************************************************************************************************
	// api.listarPorPagina = (req, res) => {
  //   console.log('Listando os álbuns por página...');
  //   let _pageId = req.params._pageId;
  //   let skip = 15 * (_pageId - 1);
  //   modelAlbum.find().skip(skip).limit(15).then( async (albums) => {
  //     let totalRows = await modelAlbum.find().count();
  //     res.json({albums, total: totalRows});
  //   }, (error) => {
  //     console.log(error);
  //     res.status(500).json(error);
  //   });
  // };
  // ****************************************************************************************************

  api.adicionar = (req, res) => {
    console.log('Cadastrando novo álbum');
    let data = req.body;
    data._id = new mongoose.Types.ObjectId().toHexString();
    modelAlbum.create(data).then((album) => {
        res.json(album);
    }, (error) => {
      console.log(error);
      res.status(500).json(error);
    });
  }

  api.buscarPorId = (req, res) => {
    console.log('Visualizando um álbum');
    let id = req.params._id;
    modelAlbum.findById(id).then((album) => {
      if(!album) throw new Error('Álbum não encontrado');
      res.json(album);
    }, (error) => {
      console.log(error);
      res.status(404).json(error);
    });
  }

  api.atualizar = (req, res) => {
    console.log('Atualizando um álbum');
    let id = req.params._id;
    let data = req.body;
    modelAlbum.findByIdAndUpdate(id, data).then((album) => {
      res.json(album);
    }, (error) => {
      console.log(error);
      res.status(500).json(error);
    });
  }
  
	return api;
}