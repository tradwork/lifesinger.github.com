var fs = require('fs')

stats2markdown('github-users-sorted-stats.json', 'github-users.md', 'Most active GitHub users')
stats2markdown('github-users-sorted-stats-china.json', 'github-users-china.md', 'Most active GitHub users in China')


function stats2markdown(datafile, mdfile, title) {
  var stats = require('./' + datafile)

  var out = '# ' + title + '\n\n'
  out += 'GitHub has released [contributions](https://github.com/blog/1360-introducing-contributions) (summary of Pull Requests, closed issues and commits).\n\n'

  var today = new Date()
  var from = new Date()
  from.setYear(today.getFullYear() - 1)
  out += 'This is the count of contributions to public repos at GitHub.com from **' + from.toGMTString() + '** till **' + today.toGMTString() + '**.\n\n'

  out += 'To repeat:\n\n'
  out += '1. Take the first 1000 users in GitHub according to the count of followers.\n'
  out += '2. Sort them by number of public contributions.\n\n'

  out += 'Made with data mining of GitHub.com ([raw data](https://github.com/lifesinger/lifesinger.github.com/tree/master/lab/2013/github-users/' + datafile + '), [script](https://github.com/lifesinger/lifesinger.github.com/tree/master/lab/2013/github-users/Makefile)).\n\n'
  out += 'Thanks to <https://gist.github.com/2657075>\n\n'

  out += '<table cellspacing="0"><thead>'
  out += '<th scope="col">#</th>'
  out += '<th scope="col">Username</th>'
  out += '<th scope="col">Contributions</th>'
  out += '<th scope="col">Language</th>'
  out += '<th scope="col">Location</th>'
  out += '<th scope="col" width="30"></th>'
  out += '</thead><tbody>\n'

  stats.forEach(function(stat, index) {
    out += '<tr>'
    out += '<th scope="row">#' + (index + 1) + '</th>'
    out += '<td><a href="https://github.com/' + stat.username + '">' + stat.username + '</a> (' + stat.aka + ') </td>'
    out += '<td>' + stat.contributions + '</td>'
    out += '<td>' + stat.language + '</td>'
    out += '<td>' + stat.location + '</td>'
    out += '<td><img width="30" height="30" src="' + stat.gravatar.replace('?s=140', '?s=30') + '"></td>'
    out += '</tr>\n'
  })

  out += '</tbody></table>'

  fs.writeFileSync(mdfile, out)
  console.log('Saved to ' + mdfile)
}

